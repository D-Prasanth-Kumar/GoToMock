import { Link } from "react-router-dom";

function HomePage() {
    return (
        <nav className="navbar">
            <h1 className="logo">GoToMock</h1>

            <Link to="/register" className="register-btn">
                Register
            </Link>
        </nav>
    );
}

export default HomePage;