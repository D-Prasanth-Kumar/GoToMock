import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How does peer matching work?",
        answer: "Search for peers by skills, role, or availability. Send an interview request with a message, and once accepted, you can schedule a session together.",
    },
    {
        question: "Is GoToMock free to use?",
        answer: "Yes — peer mock interviews and basic AI sessions are free. Premium features like advanced analytics and unlimited AI sessions will be available in future plans.",
    },
    {
        question: "What types of interviews can I practice?",
        answer: "We support technical coding rounds, system design, behavioral interviews, and role-specific tracks for frontend, backend, full stack, and mobile engineering.",
    },
    {
        question: "How is feedback provided after a session?",
        answer: "After each mock interview, both participants can leave structured feedback covering communication, technical depth, problem-solving, and areas for improvement.",
    },
    {
        question: "Can I practice with the same peer multiple times?",
        answer: "Absolutely. Building a regular practice partnership with a peer is one of the most effective ways to improve consistently over time.",
    },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="section section-alt">
            <div className="content-container">
                <div className="section-header">
                    <span className="section-badge">FAQ</span>
                    <h2 className="section-title">Common questions</h2>
                    <p className="section-description">
                        Everything you need to know about getting started with GoToMock.
                    </p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.question}
                            className={`faq-item ${openIndex === index ? "faq-item-open" : ""}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                            >
                                {faq.question}
                                <ChevronDown size={18} className="faq-chevron" />
                            </button>
                            {openIndex === index && (
                                <div className="faq-answer">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
