import { Users, Bot, MessageSquareQuote, CalendarDays, Target, TrendingUp } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Peer Mock Interviews",
        description: "Connect with people preparing for interviews and practice together.",
    },
    {
        icon: Bot,
        title: "AI Interview Practice",
        description: "No partner available? Practice with AI whenever you want.",
    },
    {
        icon: MessageSquareQuote,
        title: "Structured Feedback",
        description: "Receive actionable feedback after every interview session.",
    },
    {
        icon: CalendarDays,
        title: "Interview Scheduling",
        description: "Plan interviews at a time that works for both participants.",
    },
    {
        icon: Target,
        title: "Personalized Practice",
        description: "Find interview partners based on your goals and interests.",
    },
    {
        icon: TrendingUp,
        title: "Progress Tracking",
        description: "Review your interview history and keep improving over time.",
    },
];

function FeaturesSection() {
    return (
        <section className="section">
            <div className="content-container">
                <div className="section-header">
                    <span className="section-badge">Features</span>
                    <h2 className="section-title">Everything you need to prepare</h2>
                    <p className="section-description">
                        A complete platform built for serious interview preparation —
                        from finding peers to tracking your improvement over time.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div key={feature.title} className="feature-item">
                            <div className="feature-icon-wrap">
                                <feature.icon size={22} />
                            </div>
                            <div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
