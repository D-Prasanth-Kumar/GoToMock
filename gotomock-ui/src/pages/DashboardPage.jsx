import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Users,
    Bot,
    Search,
    Bell,
    MessageSquare,
    Calendar,
    ClipboardList,
    ChevronRight,
} from "lucide-react";
import DashboardWrapper from "../components/DashboardWrapper";
import PeerInterviewPage from "./PeerInterviewPage";
import PeerDetailsPanel from "../components/PeerDetailsPanel";
import RequestsPage from "./RequestsPage";
import RequestDetailsPanel from "../components/RequestDetailsPanel";
import UpcomingInterviewsPage from "./UpcomingInterviewsPage";
import InterviewDetailsPanel from "../components/InterviewDetailsPanel";
import { getNotifications } from "../api/notificationApi";

const HASH_VIEW_MAP = {
    "#peer": "peer",
    "#requests": "requests",
    "#upcoming": "upcoming",
    "#ai": "ai",
};

function DashboardPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const activeView = HASH_VIEW_MAP[location.hash] ?? "dashboard";

    function setActiveView(view) {
        if (view === "dashboard") {
            navigate("/dashboard");
        } else {
            navigate(`/dashboard#${view}`);
        }
    }

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [panelMode, setPanelMode] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await getNotifications();
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchNotifications();
    }, []);
    const [selectedSession, setSelectedSession] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <DashboardWrapper>
            <div className="dashboard-page">
                <div
                    className={
                        activeView === "peer" ||
                        activeView === "requests" ||
                        activeView === "upcoming"
                            ? selectedUser || selectedRequest || selectedSession
                                ? "dashboard-layout peer-layout-expanded"
                                : "dashboard-layout peer-layout"
                            : "dashboard-layout"
                    }
                >
                    <aside className="dashboard-sidebar">
                        <div className="sidebar-top">
                            <button
                                className="sidebar-logo-btn"
                                onClick={() => navigate("/")}
                                title="Go to Home"
                            >
                                <img
                                    src="/logo.png"
                                    alt="GoToMock Logo"
                                    className="sidebar-logo"
                                />
                            </button>
                            <div className="sidebar-divider"></div>
                        </div>

                        <div className="sidebar-menu">
                            <button
                                className={`sidebar-item ${activeView === "dashboard" ? "sidebar-item-active" : ""}`}
                                onClick={() => setActiveView("dashboard")}
                                title="Dashboard"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>

                            <button
                                className={`sidebar-item ${activeView === "peer" ? "sidebar-item-active" : ""}`}
                                onClick={() => setActiveView("peer")}
                                title="Peer Interview"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </button>

                            <button
                                className={`sidebar-item ${activeView === "requests" ? "sidebar-item-active" : ""}`}
                                onClick={() => setActiveView("requests")}
                                title="Requests"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </button>

                            <button
                                className={`sidebar-item ${activeView === "upcoming" ? "sidebar-item-active" : ""}`}
                                onClick={() => setActiveView("upcoming")}
                                title="Upcoming"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="sidebar-profile">
                            <div style={{ position: "relative" }}>
                                <button className="profile-btn" onClick={() => setShowProfileMenu(v => !v)}>
                                    <img
                                        src="/profile-avatar.png"
                                        alt="Profile"
                                        className="profile-avatar"
                                    />
                                </button>
                                {showProfileMenu && (
                                    <div className="profile-menu">
                                        <button className="profile-menu-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {activeView === "dashboard" && (
                        <>
                            <main className="dashboard-content">
                                <h1 className="dashboard-title">Welcome back</h1>
                                <p className="dashboard-subtitle">
                                    Ready for your next mock interview?
                                </p>

                                <div className="dashboard-cards">
                                    <div
                                        className="feature-card animate-fade-in-up"
                                        onClick={() => setActiveView("peer")}
                                        style={{ animationDelay: "0.1s" }}
                                    >
                                        <div className="feature-card-icon feature-card-icon-peer">
                                            <Users size={22} />
                                        </div>
                                        <div>
                                            <h2>Peer Mock Interview</h2>
                                            <p>Practice with real people matched to your skills</p>
                                        </div>
                                        <ChevronRight size={18} className="feature-card-arrow" />
                                    </div>

                                    <div
                                        className="feature-card animate-fade-in-up"
                                        onClick={() => setActiveView("ai")}
                                        style={{ animationDelay: "0.2s" }}
                                    >
                                        <div className="feature-card-icon feature-card-icon-ai">
                                            <Bot size={22} />
                                        </div>
                                        <div>
                                            <h2>AI Interviewer</h2>
                                            <p>Practice anytime with adaptive AI feedback</p>
                                        </div>
                                        <ChevronRight size={18} className="feature-card-arrow" />
                                    </div>
                                </div>
                            </main>

                            <aside className="dashboard-right-panel">
                                <div
                                    className="widget-card animate-fade-in-up"
                                    onClick={() => setActiveView("peer")}
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    <div className="widget-card-header">
                                        <div className="widget-icon widget-icon-search">
                                            <Search size={16} />
                                        </div>
                                        <div className="widget-title">Search Users</div>
                                    </div>
                                    <div className="widget-content">Find peers to practice with</div>
                                </div>

                                <div
                                    className="widget-card notifications-widget animate-fade-in-up"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    <div className="widget-card-header">
                                        <div className="widget-icon widget-icon-notif">
                                            <Bell size={16} />
                                        </div>
                                        <div className="widget-title">Notifications</div>
                                    </div>
                                    <div className="widget-content">Stay updated on requests</div>

                                    {showNotifications && (
                                        <div className="notifications-popup">
                                            <div className="notifications-header">Notifications</div>
                                            <div className={notifications.length > 4 ? "notifications-list scrollable" : "notifications-list"}>
                                                {notifications.length === 0 ? (
                                                    <div className="notification-empty">
                                                        No notifications yet.
                                                    </div>
                                                ) : (
                                                    notifications.map((notification) => (
                                                        <div key={notification.id} className="notification-item">
                                                            <div className="notification-title">
                                                                {notification.title}
                                                            </div>
                                                            <div className="notification-message">
                                                                {notification.message}
                                                            </div>
                                                        </div>
                                                    ))
                                                )

                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="widget-card animate-fade-in-up"
                                    onClick={() => setActiveView("requests")}
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    <div className="widget-card-header">
                                        <div className="widget-icon widget-icon-requests">
                                            <MessageSquare size={16} />
                                        </div>
                                        <div className="widget-title">Open Requests</div>
                                    </div>
                                    <div className="widget-content">Review incoming requests</div>
                                </div>

                                <div
                                    className="widget-card animate-fade-in-up"
                                    onClick={() => setActiveView("upcoming")}
                                    style={{ animationDelay: "0.6s" }}
                                >
                                    <div className="widget-card-header">
                                        <div className="widget-icon widget-icon-calendar">
                                            <Calendar size={16} />
                                        </div>
                                        <div className="widget-title">Upcoming Interviews</div>
                                    </div>
                                    <div className="widget-content">View your schedule</div>
                                </div>

                                <div className="widget-card animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                                    <div className="widget-card-header">
                                        <div className="widget-icon widget-icon-planner">
                                            <ClipboardList size={16} />
                                        </div>
                                        <div className="widget-title">Quick Planner</div>
                                    </div>
                                    <div className="widget-content">Plan your practice sessions</div>
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
                                    onClose={() => setSelectedRequest(null)}
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
