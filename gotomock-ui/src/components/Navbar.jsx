import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">
            
            <Link to="/" className="navbar-brand">

                <img src="/logo.png" alt="GoToMock Logo" className="brand-logo" />
                
                <span className="brand-name">
                    GoToMock
                </span>

            </Link>

            <div className="navbar-actions">
                
                <Link to="/register" className="nav-btn nav-btn-primary">
                    Register
                </Link>

                <Link to="/login" className="nav-btn nav-btn-secondary">
                    Login
                </Link>

                <a 
                    href="github-url"
                    target="_blank"
                    rel="noreferrer"
                    className="github-btn"
                >
                    <FaGithub size={18} />
                </a>

            </div>
            
        </nav>
    );
}

export default Navbar;