import { Link } from "react-router-dom";

function HomePage() {
    return (
        <nav className="navbar">
            <h1 className="logo">GoToMock</h1>

            <div className="auth-actions">
                <Link to="/register" className="auth-btn">
                    Register
                </Link>

                <Link to="/login" className="auth-btn">
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default HomePage;