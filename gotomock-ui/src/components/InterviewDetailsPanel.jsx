import { useNavigate } from "react-router-dom";

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function getStatusClass(status) {
    if (status === "READY") return "status-badge-pending";
    if (status === "IN_PROGRESS") return "status-badge-accepted";
    if (status === "COMPLETED") return "status-badge-rejected";
    return "status-badge-pending";
}

function InterviewDetailsPanel({ selectedSession, onClose }) {
    const navigate = useNavigate();

    return (
        <aside className="peer-details-panel">
            <button className="close-panel-btn" onClick={onClose}>
                ×
            </button>

            <div className="panel-header">
                <h2>Interview Session</h2>
                <span className={`status-badge ${getStatusClass(selectedSession.status)}`}>
                    {selectedSession.status}
                </span>
            </div>

            <div className="profile-section">
                <h3>Interviewer</h3>
                <div className="panel-user-header" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>
                    <div className="user-avatar">
                        {getInitials(selectedSession.interviewer.name)}
                    </div>
                    <p style={{ fontWeight: 600, color: "var(--color-gray-900)" }}>
                        {selectedSession.interviewer.name}
                    </p>
                </div>
            </div>

            <div className="profile-section">
                <h3>Candidate</h3>
                <div className="panel-user-header" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>
                    <div className="user-avatar">
                        {getInitials(selectedSession.candidate.name)}
                    </div>
                    <p style={{ fontWeight: 600, color: "var(--color-gray-900)" }}>
                        {selectedSession.candidate.name}
                    </p>
                </div>
            </div>

            <div className="profile-section">
                <h3>Scheduled</h3>
                <p>{selectedSession.createdAt}</p>
            </div>

            <button className="send-request-btn" style={{ marginTop: "var(--space-4)" }}
                    onClick={() => navigate(`/interview/${selectedSession.id}`)}
            >
                Join Interview
            </button>
        </aside>
    );
}

export default InterviewDetailsPanel;
