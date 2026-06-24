import { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import PeerInterviewPage from "./PeerInterviewPage";
import PeerDetailsPanel from "../components/PeerDetailsPanel";
import RequestsPage from "./RequestsPage";
import RequestDetailsPanel from "../components/RequestDetailsPanel";
import UpcomingInterviewsPage from "./UpcomingInterviewsPage";

function DashboardPage() {

    const [activeView, setActiveView] = useState("dashboard");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [panelMode, setPanelMode] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    return (
        <DashboardWrapper>

            <div className="dashboard-page">

                <div 
                    className={
                        activeView === "peer" || activeView === "requests" || activeView === "upcoming"
                            ? (selectedUser || selectedRequest || selectedSession)
                                ? "dashboard-layout peer-layout-expanded"
                                : "dashboard-layout peer-layout"
                            : "dashboard-layout"
                    }
                >

                    <aside className="dashboard-sidebar">

                        <div className="sidebar-top">

                            <img
                                src="/logo.png"
                                alt="GoToMock Logo"
                                className="sidebar-logo"
                            />

                            <div className="sidebar-divider"></div>

                        </div>

                        <div className="sidebar-menu">
                        </div>

                        <div className="sidebar-profile">

                            <button className="profile-btn">

                                <img
                                    src="/profile-avatar.png"
                                    alt="Profile"
                                    className="profile-avatar"
                                />

                            </button>

                        </div>

                    </aside>

                    {activeView === "dashboard" && (
                        <>

                            <main className="dashboard-content">

                                <h1 className="dashboard-title">
                                    Welcome back
                                </h1>

                                <div className="dashboard-cards">

                                    <div
                                        className="feature-card"
                                        onClick={() => setActiveView("peer")}
                                    >
                                        <h2>Peer Mock Interview</h2>
                                    </div>

                                    <div
                                        className="feature-card"
                                        onClick={() => setActiveView("ai")}
                                    >
                                        <h2>AI Interviewer</h2>
                                    </div>

                                </div>

                            </main>

                            <aside className="dashboard-right-panel">

                                <div className="search-widget">
                                    Search Users
                                </div>

                                <div
                                    className="notifications-widget"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                >
                                    Notifications

                                    {showNotifications && (
                                        <div className="notifications-popup">
                                            
                                            <div className="notifications-header">
                                                Notifications
                                            </div>

                                            <div className="notification-item">
                                                Alice accepted your request.
                                            </div>

                                            <div className="notification-item">
                                                Bob rejected your request.
                                            </div>

                                        </div>
                                    )}

                                </div>

                                <div
                                    className="requests-widget"
                                    onClick={() => setActiveView("requests")} 
                                >
                                    Open Requests
                                </div>

                                <div 
                                    className="upcoming-widget"
                                    onClick={() => setActiveView("upcoming")}
                                >
                                    Upcoming Interviews Schedule
                                </div>

                                <div className="planner-widget">
                                    Quick Planner
                                </div>

                            </aside>

                        </>
                    )}

                    {activeView === "peer" && (
                        <>

                            <main className="peer-interview-layout">

                                <PeerInterviewPage
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                    panelMode={panelMode}
                                    setPanelMode={setPanelMode}
                                />

                            </main>

                            {selectedUser && (

                                <PeerDetailsPanel
                                    selectedUser={selectedUser}
                                    panelMode={panelMode}
                                    onClose={() => {
                                        setSelectedUser(null);
                                        setPanelMode(null);
                                    }}
                                />

                            )}

                        </>

                    )}

                    {activeView === "requests" && (
                        <>
                            <main className="peer-interview-layout">

                                <RequestsPage 
                                    selectedRequest={selectedRequest}
                                    setSelectedRequest={setSelectedRequest}
                                />

                            </main>

                            {selectedRequest && (

                                <RequestDetailsPanel
                                    selectedRequest={selectedRequest}
                                    setSelectedRequest={setSelectedRequest}
                                    onClose={() => 
                                        setSelectedRequest(null)
                                    }
                                />

                            )}
                        </>
                        
                    )}

                    {activeView === "upcoming" && (
                        <>
                            <main className="peer-interview-layout">

                                <UpcomingInterviewsPage
                                    selectedSession={selectedSession}
                                    setSelectedSession={setSelectedSession}
                                />

                            </main>

                            {selectedSession && (

                                <InterviewDetailsPanel
                                    selectedSession={selectedSession}
                                    onClose={() => setSelectedSession(null)}
                                />
                                
                            )}
                        </>
                    )}

                </div>

            </div>

        </DashboardWrapper>
    );
}

export default DashboardPage;