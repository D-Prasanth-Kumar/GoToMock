import { Code2, Database, Cloud, Smartphone, LaptopIcon, MessageCircleIcon, Briefcase, GraduationCap } from "lucide-react";

const tracks = [
    {
        icon: LaptopIcon,
        iconClass: "track-icon-blue",
        title: "Technical Interviews",
        description: "Practice problem-solving, domain knowledge, and technical discussions.",
        tag: "",
    },
    {
        icon: MessageCircleIcon,
        iconClass: "track-icon-green",
        title: "Behavioral Interviews",
        description: "Improve communication, leadership, and teamwork responses.",
        tag: "",
    },
    {
        icon: Briefcase,
        iconClass: "track-icon-purple",
        title: "HR Interviews",
        description: "Prepare for introductions, career goals, and culture-fit questions.",
        tag: "",
    },
    {
        icon: GraduationCap,
        iconClass: "track-icon-orange",
        title: "Academic Interviews",
        description: "Practice admissions, research, and scholarship interviews.",
        tag: "",
    },
];

function InterviewTracksSection() {
    return (
        <section className="section section-alt">
            <div className="content-container">
                <div className="section-header">
                    <span className="section-badge">Interview Tracks</span>
                    <h2 className="section-title">Practice for your target role</h2>
                    <p className="section-description">
                        Whether you're preparing for technical, behavioral,
                        HR, or academic interviews, GoToMock helps you
                        practice with peers or AI before the real interview.
                    </p>
                </div>

                <div className="tracks-grid">
                    {tracks.map((track) => (
                        <div key={track.title} className="track-card">
                            <div className={`track-icon ${track.iconClass}`}>
                                <track.icon size={22} />
                            </div>
                            <h3>{track.title}</h3>
                            <p>{track.description}</p>
                            <span className="track-tag">{track.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default InterviewTracksSection;
