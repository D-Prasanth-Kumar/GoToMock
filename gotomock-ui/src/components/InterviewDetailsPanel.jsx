function InterviewDetailsPanel({
    selectedSession,
    onClose
}) {
    return (
        <aside className="peer-details-panel">

            <button
                className="close-panel-btn"
                onClick={onClose}
            >
                ×
            </button>

            <h2>Interview Session</h2>

            <div className="profile-section">

                <h3>Interviewer</h3>

                <p>{selectedSession.interviewer.name}</p>

            </div>

            <div className="profile-section">

                <h3>Candidate</h3>

                <p>{selectedSession.candidate.name}</p>

            </div>

            <div className="profile-section">

                <h3>Status</h3>

                <p>{selectedSession.status}</p>

            </div>

            <div className="profile-section">

                <h3>Created At</h3>

                <p>{selectedSession.createdAt}</p>

            </div>

            <button
                className="send-request-btn"
            >
                Join Interview
            </button>

        </aside>
    )
}

export default InterviewDetailsPanel;