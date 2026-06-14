import { useState } from "react";
import { registerUser } from "../api/userApi";

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");

    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {
            username, 
            name, 
            email, 
            password, 
            skills
        };

        const response = await registerUser(userData);

        const data = await response.json();

        if (response.ok) {
            setMessage("User registered successfully!");

            setUsername("");
            setName("");
            setEmail("");
            setPassword("");
            setSkills("");
        } else {
            setMessage(data.error);
        }
    }

    return (
        <div className="register-container">
            <h1>Register</h1>

            {message && <p>{message}</p>}

            <form className="register-form" onSubmit={handleSubmit}>

                <label>Username</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Skills</label>
                <input 
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)} 
                />

                <button type="submit">
                    Register
                </button>

            </form>
        </div>
    );
}

export default RegisterPage;