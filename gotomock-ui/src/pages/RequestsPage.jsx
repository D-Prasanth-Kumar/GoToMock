import { useEffect, useState } from "react";
import { getReceivedRequests } from "../api/requestApi";

function RequestsPage({
    selectedRequest,
    setSelectedRequest
}) {

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
        <div>
            <h1 className="dashboard-title">
                Incoming Requests
            </h1>

            <div className="search-results">

                {requests.map((request) => (

                    <div
                        key={request.id}
                        className="search-result-row"
                        onClick={() => setSelectedRequest(request)}
                    >

                        <div>
                            <h3>{request.sender.name}</h3>

                            <p>{request.sender.skills}</p>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    );
}

export default RequestsPage;