import { useEffect, useState } from "react";
import { getMySessions } from "../api/interviewApi";

function UpcomingInterviewsPage({
    selectedSession, 
    setSelectedSession
}) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        loadSessions();
    }, []);

    async function loadSessions() {
        try {
            const response = await getMySessions();

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await response.json();
            setSessions(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className="dashboard-title">
                Upcoming Interviews
            </h1>

            <div className="requests-list">

                {sessions.map(session => (

                    <div
                        key={session.id}
                        className="request-row"
                        onClick={() => setSelectedSession(session)}
                    >
                        <div>
                            <h3>
                                {session.interviewer.name}
                            </h3>

                            <p>{session.status}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default UpcomingInterviewsPage;