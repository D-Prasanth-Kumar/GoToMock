const resources = [
    {
        emoji: "📚",
        imageClass: "study-card-image-1",
        title: "Preparation Resources",
        description: "Curated guides, articles, books, videos, templates, and learning materials to help you prepare confidently for interviews across different domains.",
        lessons: "",
        level: "",
    },
    {
        emoji: "🗪",
        imageClass: "study-card-image-2",
        title: "Interview Experiences",
        description: "Explore real interview experiences shared by candidates from different industries, roles, and organizations.",
        lessons: "",
        level: "",
    },
    {
        emoji: "🌐",
        imageClass: "study-card-image-3",
        title: "Community Discussions",
        description: "Ask questions, share preparation strategies, exchange insights, and learn from fellow candidates preparing for interviews.",
        lessons: "",
        level: "",
    },
];

function StudyHubSection() {
    return (
        <section className="section">
            <div className="content-container">
                <div className="section-header">
                    <span className="section-badge">Study Hub</span>
                    <h2 className="section-title">Structured learning paths</h2>
                    <p className="section-description">
                        Curated resources to complement your mock interviews and
                        build the knowledge you need for every round.
                    </p>
                </div>

                <div className="study-grid">
                    {resources.map((resource) => (
                        <div key={resource.title} className="study-card">
                            <div className={`study-card-image ${resource.imageClass}`}>
                                {resource.emoji}
                            </div>
                            <div className="study-card-body">
                                <h3>{resource.title}</h3>
                                <p>{resource.description}</p>
                                <div className="study-card-meta">
                                    <span>{resource.lessons}</span>
                                    <span className="study-card-meta-dot"></span>
                                    <span>{resource.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StudyHubSection;
