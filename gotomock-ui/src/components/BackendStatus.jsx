import { useEffect, useState } from "react";
import { checkHealth } from "../api/healthApi";

const RETRY_INTERVAL_MS = 5000;

function BackendStatus({ children }) {
    const [ready, setReady] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function ping() {
            const ok = await checkHealth().catch(() => false);

            if (cancelled) return;

            if (ok) {
                setReady(true);
            } else {
                setTimeout(() => {
                    if (!cancelled) setAttempt(a => a + 1);
                }, RETRY_INTERVAL_MS);
            }
        }

        ping();

        return () => { cancelled = true; };
    }, [attempt]);

    if (ready) return children;

    return (
        <div className="backend-status-screen">
            <img src="/logo.png" alt="GoToMock" className="backend-status-logo" />
            <div className="backend-status-spinner" />
            <p className="backend-status-text">Connecting to server...</p>
            <p className="backend-status-subtext">This may take a moment on first load</p>
        </div>
    );
}

export default BackendStatus;
