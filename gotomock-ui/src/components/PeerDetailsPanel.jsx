import { useState } from "react";
import { sendInterviewRequest } from "../api/requestApi";

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function parseSkills(skills) {
    if (!skills) return [];
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
}

function PeerDetailsPanel({ selectedUser, panelMode, onClose }) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSendRequest() {
        try {
            setSending(true);

            const response = await sendInterviewRequest({
                receiverId: selectedUser.id,
                message: message,
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
            <button className="close-panel-btn" onClick={onClose}>
                ×
            </button>

            {panelMode === "profile" && (
                <>
                    <div className="panel-user-header">
                        <div className="user-avatar">{getInitials(selectedUser.name)}</div>
                        <div>
                            <h2>{selectedUser.name}</h2>
                            <p>@{selectedUser.username || "user"}</p>
                        </div>
                    </div>

                    {parseSkills(selectedUser.skills).length > 0 && (
                        <div className="skill-tags">
                            {parseSkills(selectedUser.skills).map((skill) => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    )}

                    <div className="profile-section">
                        <h3>About</h3>
                        <p>Passionate engineer preparing for technical interviews. Open to peer mock sessions and knowledge sharing.</p>
                    </div>

                    <div className="profile-section">
                        <h3>Interview Statistics</h3>
                        <p>Completed sessions: 0</p>
                        <p>Average rating: N/A</p>
                    </div>
                </>
            )}

            {panelMode === "request" && (
                <>
                    <div className="panel-header">
                        <h2>Send Interview Request</h2>
                        <p>Request a mock interview with {selectedUser.name}</p>
                    </div>

                    <div className="panel-user-header">
                        <div className="user-avatar">{getInitials(selectedUser.name)}</div>
                        <div className="result-user-info">
                            <h3>{selectedUser.name}</h3>
                            <p>{selectedUser.skills}</p>
                        </div>
                    </div>

                    <div className="request-form">
                        <label>Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Hi! I'd love to do a mock interview with you. I'm preparing for..."
                            className="request-message"
                        />
                        <button
                            onClick={handleSendRequest}
                            disabled={sending}
                            className="send-request-btn"
                        >
                            {sending ? "Sending..." : "Send Request"}
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}

export default PeerDetailsPanel;
