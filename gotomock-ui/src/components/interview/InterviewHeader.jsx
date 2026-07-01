function InterviewHeader({ timer, onLeave }) {
    return (
        <header className="interview-topbar">
            <img
                src="/logo.png"
                alt="GoToMock"
                className="brand-logo"
            />

            <div className="interview-timer">
                {timer}
            </div>

            <button
                className="btn btn-danger"
                onClick={onLeave}
            >
                Leave
            </button>
        </header>
    );
}

export default InterviewHeader;