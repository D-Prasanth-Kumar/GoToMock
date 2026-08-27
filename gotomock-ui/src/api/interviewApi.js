import { API_BASE_URL } from "../config/apiConfig";

export async function getMySessions() {
    const token = localStorage.getItem("token");

    return fetch(
        `${API_BASE_URL}/interviews/my-sessions`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export async function getSessionById(sessionId) {
    const token = localStorage.getItem("token");

    return fetch(
        `${API_BASE_URL}/interviews/${sessionId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}
