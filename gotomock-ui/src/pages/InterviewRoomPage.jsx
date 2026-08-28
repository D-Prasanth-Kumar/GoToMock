import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff, MonitorUp, MonitorX, MessageSquare } from "lucide-react";
import InterviewHeader from "../components/interview/InterviewHeader";
import VideoLayout from "../components/interview/VideoLayout";
import { WS_BASE_URL } from "../config/apiConfig";

function InterviewRoomPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [remoteCameraEnabled, setRemoteCameraEnabled] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const [micEnabled, setMicEnabled] = useState(true);
    const [localStream, setLocalStream] = useState(null);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);

    // Assign remote stream to video element whenever ref or stream becomes available
    useEffect(() => {
        if (remoteStreamRef.current && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStreamRef.current;
        }
    }, [remoteCameraEnabled]);

    useEffect(() => {
        if (!localStream) return;
        if (!localVideoRef.current) return;
        localVideoRef.current.srcObject = localStream;
    }, [localStream, cameraEnabled]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            socketRef.current?.close();
        };
    }, []);

    useEffect(() => {
        localStreamRef.current = localStream;
    }, [localStream]);

    const startCamera = async () => {
        try {
            const existing = localStreamRef.current;
            if (existing) {
                existing.getVideoTracks().forEach(t => { t.enabled = true; });
                if (localVideoRef.current) localVideoRef.current.srcObject = existing;
                setCameraEnabled(true);
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setLocalStream(stream);
            localStreamRef.current = stream;

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            const pc = peerConnectionRef.current;
            if (pc) {
                stream.getTracks().forEach(track => {
                    const alreadyAdded = pc.getSenders().some(s => s.track === track);
                    if (!alreadyAdded) {
                        pc.addTrack(track, stream);
                    }
                });

                if (pc.signalingState === "stable" && pc.getSenders().filter(s => s.track).length > 0) {
                    await createOfferWithStream(stream);
                }
            }

            setCameraEnabled(true);
            setMicEnabled(true);
        } catch (error) {
            console.error(error);
            alert("Unable to access camera.");
        }
    };

    const stopCamera = () => {
        const stream = localStreamRef.current;
        if (!stream) return;

        stream.getVideoTracks().forEach(track => { track.enabled = false; });

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }

        setCameraEnabled(false);
    };

    const toggleCamera = () => {
        if (cameraEnabled) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const toggleMic = () => {
        const stream = localStreamRef.current;
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
        }
        setMicEnabled(prev => !prev);
    };

    const handleLeave = () => {
        const stream = localStreamRef.current;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        remoteStreamRef.current = null;

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "LEAVE",
                sessionId: Number(sessionId)
            }));
            socketRef.current.close();
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        navigate("/dashboard");
    };

    const connectWebSocket = () => {
        if (socketRef.current) return;

        const token = localStorage.getItem("token");
        socketRef.current = new WebSocket(`${WS_BASE_URL}/ws/interview?token=${token}`);

        socketRef.current.onopen = () => {
            console.log("Connected");

            createPeerConnection();

            socketRef.current.send(JSON.stringify({
                type: "JOIN",
                sessionId: Number(sessionId)
            }));
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleSignalMessage(message);
        };

        socketRef.current.onclose = () => {
            console.log("Disconnected");
        };

        socketRef.current.onerror = (error) => {
            console.error(error);
        };
    };

    const handleOffer = async (offer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

        const stream = localStreamRef.current;
        if (stream) {
            stream.getTracks().forEach(track => {
                const alreadyAdded = peerConnectionRef.current
                                                      .getSenders()
                                                      .some(sender => sender.track === track);
                if (!alreadyAdded) {
                    peerConnectionRef.current.addTrack(track, stream);
                }
            });
        }

        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);

        socketRef.current.send(JSON.stringify({
            type: "ANSWER",
            sessionId: Number(sessionId),
            answer: answer
        }));

        console.log("Answer sent");
    };

    const handleSignalMessage = async (message) => {
        switch (message.type) {
            case "PARTNER_JOINED":
                console.log("Partner joined");
                await createOffer();
                break;
            case "OFFER":
                await handleOffer(message.offer);
                break;
            case "ANSWER":
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
                console.log("Answer received");
                break;
            case "ICE_CANDIDATE":
                if (peerConnectionRef.current) {
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
                }
                break;
            default:
                console.log(message);
        }
    };

    const createPeerConnection = () => {
        if (peerConnectionRef.current) return;

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:openrelay.metered.ca:80" },
                {
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                },
                {
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                },
                {
                    urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                }
            ]
        });

        peerConnection.onicecandidate = (event) => {
            if (!event.candidate) return;
            if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

            socketRef.current.send(JSON.stringify({
                type: "ICE_CANDIDATE",
                sessionId: Number(sessionId),
                candidate: event.candidate
            }));
        };

        peerConnection.ontrack = (event) => {
            const remoteStream = event.streams[0];
            remoteStreamRef.current = remoteStream;
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }
            setRemoteCameraEnabled(true);
        };

        peerConnection.onconnectionstatechange = () => {
            console.log("Connection:", peerConnection.connectionState);
        };

        peerConnection.onsignalingstatechange = () => {
            console.log("Signaling:", peerConnection.signalingState);
        };

        peerConnection.oniceconnectionstatechange = () => {
            console.log("ICE:", peerConnection.iceConnectionState);
        };

        peerConnectionRef.current = peerConnection;
    };

    const createOffer = async () => {
        if (!peerConnectionRef.current) return;
        if (!localStreamRef.current) return;
        await createOfferWithStream(localStreamRef.current);
    };

    const createOfferWithStream = async (stream) => {
        if (!peerConnectionRef.current) return;
        if (!stream) return;
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        socketRef.current.send(JSON.stringify({
            type: "OFFER",
            sessionId: Number(sessionId),
            offer: offer
        }));

        console.log("Offer sent");
    };

    return (
        <div className="interview-room">

            <InterviewHeader
                timer="00:00"
                onLeave={handleLeave}
            />

            <main className="interview-stage">
                <VideoLayout
                    cameraEnabled={cameraEnabled}
                    remoteCameraEnabled={remoteCameraEnabled}
                    screenSharing={screenSharing}
                    localVideoRef={localVideoRef}
                    remoteVideoRef={remoteVideoRef}
                />
            </main>

            <footer className="interview-toolbar">

                <button
                    className={`toolbar-btn ${!micEnabled ? "toolbar-btn-off" : ""}`}
                    onClick={toggleMic}
                    title={micEnabled ? "Mute" : "Unmute"}
                >
                    {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                <button
                    className={`toolbar-btn ${!cameraEnabled ? "toolbar-btn-off" : ""}`}
                    onClick={toggleCamera}
                    title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
                >
                    {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>

                <button
                    className={`toolbar-btn ${screenSharing ? "toolbar-btn-active" : ""}`}
                    onClick={() => setScreenSharing(!screenSharing)}
                    title={screenSharing ? "Stop sharing" : "Share screen"}
                >
                    {screenSharing ? <MonitorX size={20} /> : <MonitorUp size={20} />}
                </button>

                <button className="toolbar-btn" title="Chat">
                    <MessageSquare size={20} />
                </button>

            </footer>

        </div>
    );
}

export default InterviewRoomPage;