import { API_BASE_URL } from "../config/apiConfig";

export async function loginUser(loginData) {

    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }
    );

    return response;
}