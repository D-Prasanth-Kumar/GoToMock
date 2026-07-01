import { useEffect, useState } from "react";
import { getReceivedRequests } from "../api/requestApi";

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function RequestsPage({ selectedRequest, setSelectedRequest }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        try {
            const response = await getReceivedRequests();
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="peer-interview-page">
            <h1 className="dashboard-title">Incoming Requests</h1>
            <p className="dashboard-subtitle">
                Review and respond to interview requests from peers
            </p>

            <div className="search-results">
                {requests.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon-wrap">
                            <svg
                                className="empty-state-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <div className="empty-state-title">No pending requests</div>
                        <div className="empty-state-description">
                            When someone sends you an interview request, it will appear here
                        </div>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div
                            key={request.id}
                            className="search-result-row"
                            onClick={() => setSelectedRequest(request)}
                        >
                            <div className="user-row-content">
                                <div className="user-avatar">
                                    {getInitials(request.sender.name)}
                                </div>
                                <div className="result-user-info">
                                    <h3>{request.sender.name}</h3>
                                    <p>{request.sender.skills}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RequestsPage;
