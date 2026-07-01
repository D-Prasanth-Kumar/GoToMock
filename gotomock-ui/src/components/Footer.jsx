import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <div className="footer-brand">
                        <img src="/logo.png" alt="GoToMock" className="brand-logo" />
                        <span className="footer-brand-name">GoToMock</span>
                    </div>
                    <p className="footer-tagline">
                        The peer-powered mock interview platform helping engineers
                        land their dream jobs through real practice.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Product</h4>
                    <div className="footer-links">
                        <a href="#tracks">Interview Tracks</a>
                        <a href="#features">Features</a>
                        <a href="#ai">AI Interviewer</a>
                        <a href="#study">Study Hub</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <div className="footer-links">
                        <a href="#about">About</a>
                        <a href="#blog">Blog</a>
                        <a href="#careers">Careers</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Account</h4>
                    <div className="footer-links">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>&copy; {new Date().getFullYear()} GoToMock. All rights reserved.</span>
                <span>Built for engineers, by engineers.</span>
            </div>
        </footer>
    );
}

export default Footer;
