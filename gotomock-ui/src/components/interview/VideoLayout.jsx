function VideoLayout({
    cameraEnabled,
    remoteCameraEnabled,
    screenSharing,
    localVideoRef,
    remoteVideoRef
}) {
    return (
        <div className="video-layout">
            <div className="remote-video">
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {!remoteCameraEnabled && (
                    <div className="participant-avatar-overlay">
                        <div className="participant-avatar">P</div>
                    </div>
                )}
                <div className="participant-name">Remote Participant</div>
            </div>

            <div className="local-video">
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                {!cameraEnabled && (
                    <div className="participant-avatar-overlay">
                        <div className="participant-avatar">You</div>
                    </div>
                )}
                <div className="participant-name">You</div>
            </div>
        </div>
    );
}

export default VideoLayout;
