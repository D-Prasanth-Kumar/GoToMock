import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error(error);
            setMessage("Invalid username or password");
            setIsError(true);
        }
    }

    return (
        <div className="auth-container">
            <Link to="/" className="auth-brand">
                <img src="/logo.png" alt="GoToMock" className="brand-logo" />
                <span className="auth-brand-name">GoToMock</span>
            </Link>

            <h1>Welcome back</h1>
            <p className="auth-subtitle">Sign in to continue your interview prep</p>

            {message && (
                <div className={`auth-message ${isError ? "error" : "success"}`}>
                    {message}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit">Sign In</button>
            </form>

            <p className="auth-footer-link">
                Don't have an account? <Link to="/register">Create one</Link>
            </p>
        </div>
    );
}

export default LoginPage;
