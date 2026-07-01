import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="hero-section">
            <div className="content-container hero-simple">
                <div className="hero-content-centered animate-fade-in-up">
                    <div className="hero-eyebrow">
                        <span className="hero-eyebrow-dot"></span>
                        Peer & AI mock interviews
                    </div>

                    <h1 className="hero-title-centered">
                        Get Practical Mock Interviews.{" "}
                        <span className="hero-title-accent">Get Interview Ready.</span>
                    </h1>

                    <p className="hero-description-centered">
                        Prepare with peer-to-peer mock interviews, AI-driven practice,
                        structured learning paths, and detailed feedback designed to
                        help you crack top interviews.
                    </p>

                    <div className="hero-buttons-centered">
                        <Link to="/register" className="hero-btn-primary">
                            Find a Mock Interview
                        </Link>
                        <button className="hero-btn-secondary">
                            Try AI Interview
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">24×7</div>
                            <div className="hero-stat-label">Practice Anytime</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">AI</div>
                            <div className="hero-stat-label">Mock Interview</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">∞</div>
                            <div className="hero-stat-label">Any Profession</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
