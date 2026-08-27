import { API_BASE_URL } from "../config/apiConfig";

export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
}
