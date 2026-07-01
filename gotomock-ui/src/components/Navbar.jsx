import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Navbar() {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <nav className="navbar">
            
            <Link to="/" className="navbar-brand">

                <img src="/logo.png" alt="GoToMock Logo" className="brand-logo" />
                
                <span className="brand-name">
                    GoToMock
                </span>

            </Link>

            <div className="navbar-actions">

                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard" className="nav-btn nav-btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </Link>

                        <Link to="/dashboard" className="nav-btn nav-btn-secondary">
                            <img
                                src="/profile-avatar.png"
                                alt="Profile"
                                style={{ width: 18, height: 18, borderRadius: "50%", objectFit: "cover" }}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="nav-btn nav-btn-primary">
                            Register
                        </Link>

                        <Link to="/login" className="nav-btn nav-btn-secondary">
                            Login
                        </Link>
                    </>
                )}

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