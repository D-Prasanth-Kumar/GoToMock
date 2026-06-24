import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function LoginPage() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            
            const response = await loginUser({
                username, 
                password
            });

            console.log(response.status);

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            localStorage.setItem(
                "token",
                data.token
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            alert("Invalid username or password");
        }
    }

    return (
        <div className="auth-container">
            <h1>Login</h1>

            <form className="auth-form" onSubmit={handleSubmit}>

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;