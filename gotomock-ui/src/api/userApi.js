export async function registerUser(userData) {
    
    const response = await fetch(
        "http://localhost:8081/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );

    return response;
}

export async function getAvailableUsers() {
    
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8081/users/available",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}

export async function searchUsers(skill) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:8081/users/search?skill=${skill}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}