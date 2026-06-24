import { useState } from "react";
import { sendInterviewRequest } from "../api/requestApi";

function PeerDetailsPanel({
    selectedUser,
    panelMode,
    onClose
}) {

    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSendRequest() {
        try {
            setSending(true);

            const response = await sendInterviewRequest({
                receiverId: selectedUser.id,
                message: message
            });

            if (!response.ok) {
                throw new Error("Failed to send request");
            }

            alert("Interview request sent");

            setMessage("");
        } catch (error) {
            console.error(error);
            alert("Unable to send request");
        } finally {
            setSending(false);
        }
    }

    return (

        <aside className="peer-details-panel">

            <button
                className="close-panel-btn"
                onClick={onClose}
            >
                ×
            </button>

            {panelMode === "profile" && (

                <>
                    <h2>{selectedUser.name}</h2>

                    <p>{selectedUser.skills}</p>

                    <div className="profile-section">
                        <h3>About</h3>

                        <p>
                            User bio will be shown here.
                        </p>
                    </div>

                    <div className="profile-section">
                        <h3>Interview Statistics</h3>
                        <p>Completed: 0</p>
                        <p>Rating: N/A</p>
                    </div>
                
                </>

            )}

            {panelMode === "request" && (

                <>
                    <h2>Send Interview Request</h2>

                    <p>
                        Request interview with {selectedUser.name}
                    </p>

                    <div className="request-form">

                        <label>
                            Message
                        </label>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type here."
                            className="request-message"
                        />

                        <button
                            onClick={handleSendRequest}
                            disabled={sending}
                            className="send-request-btn"
                        >
                            {sending ? "Sending" : "Send Request"}
                        </button>
                        
                    </div>
                
                </>
                
            )}

        </aside>

    );
}

export default PeerDetailsPanel;