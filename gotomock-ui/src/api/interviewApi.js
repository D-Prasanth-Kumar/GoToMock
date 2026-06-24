export async function getMySessions() {
    const token = localStorage.getItem("token");

    return fetch(
        "http://localhost:8081/interviews/my-sessions",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}