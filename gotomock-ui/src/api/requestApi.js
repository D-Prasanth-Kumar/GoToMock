export async function sendInterviewRequest(requestData) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8081/requests",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        }
    );

    return response;
}

export async function getReceivedRequests() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8081/requests/received",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}

export async function acceptRequest(requestId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:8081/requests/${requestId}/accept`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}

export async function rejectRequest(requestId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:8081/requests/${requestId}/reject`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}