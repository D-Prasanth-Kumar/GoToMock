export async function getNotifications() {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:8081/notificatoins",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}