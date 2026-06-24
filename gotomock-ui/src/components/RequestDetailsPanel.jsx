import { acceptRequest, rejectRequest } from "../api/requestApi";

function RequestDetailsPanel({
    selectedRequest,
    setSelectedRequest,
    onClose
}) {
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

            <button
                className="close-panel-btn"
                onClick={onClose}
            >
                ×
            </button>

            <h2>{selectedRequest.sender.name}</h2>

            <p>{selectedRequest.sender.skills}</p>

            <div className="profile-section">

                <h3>Message</h3>

                <p>{selectedRequest.message}</p>

            </div>

            <div className="profile-section">

                <h3>Status</h3>

                <p>{selectedRequest.status}</p>

            </div>

            {selectedRequest.status === "PENDING" && (

                <div className="result-actions">

                    <button
                        onClick={handleAccept}
                    >
                        Accept
                    </button>

                    <button
                        onClick={handleReject}
                    >
                        Reject
                    </button>

                </div>

            )}

        </aside>
    );
}

export default RequestDetailsPanel;