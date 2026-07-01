import { API_BASE_URL } from "../config/apiConfig";

export async function getNotifications() {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${API_BASE_URL}/notifications`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}