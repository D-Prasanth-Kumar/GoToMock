import { acceptRequest, rejectRequest } from "../api/requestApi";

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
    if (status === "ACCEPTED") return "status-badge-accepted";
    if (status === "REJECTED") return "status-badge-rejected";
    return "status-badge-pending";
}

function RequestDetailsPanel({ selectedRequest, setSelectedRequest, onClose }) {
    async function handleAccept() {
        try {
            const response = await acceptRequest(selectedRequest.id);

            if (!response.ok) {
                throw new Error();
            }

            const updatedRequest = await response.json();
            setSelectedRequest(updatedRequest);
            alert("Request accepted");
        } catch (error) {
            console.error(error);
            alert("Unable to accept request");
        }
    }

    async function handleReject() {
        try {
            const response = await rejectRequest(selectedRequest.id);

            if (!response.ok) {
                throw new Error();
            }

            const updatedRequest = await response.json();
            setSelectedRequest(updatedRequest);
            alert("Request rejected");
        } catch (error) {
            console.error(error);
            alert("Unable to reject request");
        }
    }

    return (
        <aside className="peer-details-panel">
            <button className="close-panel-btn" onClick={onClose}>
                ×
            </button>

            <div className="panel-user-header">
                <div className="user-avatar">
                    {getInitials(selectedRequest.sender.name)}
                </div>
                <div>
                    <h2>{selectedRequest.sender.name}</h2>
                    <p>{selectedRequest.sender.skills}</p>
                </div>
            </div>

            <div className="profile-section">
                <h3>Message</h3>
                <p>{selectedRequest.message || "No message provided."}</p>
            </div>

            <div className="profile-section">
                <h3>Status</h3>
                <span className={`status-badge ${getStatusClass(selectedRequest.status)}`}>
                    {selectedRequest.status}
                </span>
            </div>

            {selectedRequest.status === "PENDING" && (
                <div className="panel-actions">
                    <button className="btn btn-success" onClick={handleAccept}>
                        Accept
                    </button>
                    <button className="btn btn-danger" onClick={handleReject}>
                        Reject
                    </button>
                </div>
            )}
        </aside>
    );
}

export default RequestDetailsPanel;
