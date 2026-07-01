import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = { username, name, email, password, skills };
        const response = await registerUser(userData);
        const data = await response.json();

        if (response.ok) {
            setMessage("Account created successfully! Redirecting to sign in...");
            setIsSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } else {
            if (data.error) {
                setMessage(data.error);
            } else {
                const firstError = Object.values(data)[0];
                setMessage(firstError || "Registration failed. Please try again.");
            }
            setIsSuccess(false);
        }
    }

    return (
        <div className="auth-container">
            <Link to="/" className="auth-brand">
                <img src="/logo.png" alt="GoToMock" className="brand-logo" />
                <span className="auth-brand-name">GoToMock</span>
            </Link>

            <h1>Create your account</h1>
            <p className="auth-subtitle">Join thousands preparing for their dream role</p>

            {message && (
                <div className={`auth-message ${isSuccess ? "success" : "error"}`}>
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
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                    />
                </div>

                <div>
                    <label>Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., JavaScript, React, Node.js"
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>

            <p className="auth-footer-link">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
