import { Check } from "lucide-react";

const benefits = [
    "Practice anytime",
    "Available whenever you need",
    "Instant feedback on answers",
    "Behavioral & technical interviews",
];

function AIInterviewSection() {
    return (
        <section className="section section-alt">
            <div className="content-container">
                <div className="ai-showcase">
                    <div className="ai-showcase-content">
                        <span className="section-badge">AI Interviewer</span>
                        <h2>Your Personal AI Interview Partner</h2>
                        <p>
                            Practice interviews anytime with an AI interviewer designed to simulate real interview 
                            conversations. Build confidence, improve communication, and sharpen your problem-solving 
                            skills whenever you want.
                        </p>

                        <div className="ai-benefits">
                            {benefits.map((benefit) => (
                                <div key={benefit} className="ai-benefit">
                                    <span className="ai-benefit-check">
                                        <Check size={12} />
                                    </span>
                                    {benefit}
                                </div>
                            ))}
                        </div>

                        <button className="hero-btn-primary">
                            Start AI Interview
                        </button>
                    </div>

                    <div className="ai-preview-card">
                        <div className="ai-preview-header">
                            <div className="ai-preview-avatar">AI</div>
                            <div>
                                <div className="ai-preview-label">GoToMock AI</div>
                                <div className="ai-preview-status">Interview · Live</div>
                            </div>
                        </div>

                        <div className="ai-chat-bubble">
                            Tell me about yourself and why you're interested in this role.
                        </div>

                        <div className="ai-chat-bubble ai-chat-bubble-user">
                            I'm passionate about solving problems and enjoy working on challenging projects...
                        </div>

                        <div className="ai-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AIInterviewSection;
