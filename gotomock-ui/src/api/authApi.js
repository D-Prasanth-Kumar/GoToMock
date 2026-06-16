export async function loginUser(loginData) {

    const response = await fetch(
        "http://localhost:8081/auth/login",
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