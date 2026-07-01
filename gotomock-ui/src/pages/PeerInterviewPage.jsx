import { Search } from "lucide-react";
import { useState } from "react";
import { getAvailableUsers, searchUsers } from "../api/userApi";

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function PeerInterviewPage({
    selectedUser,
    setSelectedUser,
    panelMode,
    setPanelMode,
}) {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);

    async function handleSearch() {
        try {
            let response;

            if (searchText.trim() === "") {
                response = await getAvailableUsers();
            } else {
                response = await searchUsers(searchText);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="peer-interview-page">
            <h1 className="dashboard-title">Find a Peer</h1>
            <p className="dashboard-subtitle">
                Search for interview partners by name or skills
            </p>

            <div className="peer-interview-toolbar">
                <div className="peer-search-wrapper">
                    <Search size={16} className="peer-search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or skills..."
                        className="peer-search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>

                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="search-results">
                {users.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon-wrap">
                            <Search size={24} className="empty-state-icon" />
                        </div>
                        <div className="empty-state-title">No users found</div>
                        <div className="empty-state-description">
                            Try searching for peers or click Search to browse available users
                        </div>
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="search-result-row">
                            <div className="user-row-content">
                                <div className="user-avatar">{getInitials(user.name)}</div>
                                <div className="result-user-info">
                                    <h3>{user.name}</h3>
                                    <p>{user.skills}</p>
                                </div>
                            </div>

                            <div className="result-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setPanelMode("request");
                                    }}
                                >
                                    Request
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setPanelMode("profile");
                                    }}
                                >
                                    Profile
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PeerInterviewPage;
