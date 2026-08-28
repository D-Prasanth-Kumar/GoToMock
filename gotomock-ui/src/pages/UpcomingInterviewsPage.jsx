import { useEffect, useState } from "react";
import { getMySessions } from "../api/interviewApi";

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

function UpcomingInterviewsPage({ selectedSession, setSelectedSession }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        loadSessions();
    }, []);

    async function loadSessions() {
        try {
            const response = await getMySessions();

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await response.json();
            setSessions(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="peer-interview-page">
            <h1 className="dashboard-title">Upcoming Interviews</h1>
            <p className="dashboard-subtitle">Your scheduled mock interview sessions</p>

            <div className="requests-list">
                {sessions.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon-wrap">
                            <svg
                                className="empty-state-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div className="empty-state-title">No upcoming sessions</div>
                        <div className="empty-state-description">
                            Accept an interview request to schedule your first session
                        </div>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            className="request-row"
                            onClick={() => setSelectedSession(session)}
                        >
                            <div className="user-row-content">
                                <div className="user-avatar">
                                    {getInitials(session.interviewer.name)}
                                </div>
                                <div className="result-user-info">
                                    <h3>{session.interviewer.name}</h3>
                                    <p>with {session.candidate?.name || "you"}</p>
                                </div>
                            </div>
                            <span className={`status-badge ${getStatusClass(session.status)}`}>
                                {session.status}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UpcomingInterviewsPage;
