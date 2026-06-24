import { Search } from "lucide-react";
import { useState } from "react";
import { getAvailableUsers, searchUsers } from "../api/userApi";

function PeerInterviewPage({
    selectedUser,
    setSelectedUser,
    panelMode,
    setPanelMode
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

            <h1 className="dashboard-title">
                Peer Interview Page
            </h1>

            <div className="peer-interview-toolbar">

                <div className="peer-search-wrapper">

                    <Search
                        size={18}
                        className="peer-search-icon"
                    />

                    <input
                        type="text"
                        placeholder="Search peers..."
                        className="peer-search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    
                </div>

                <button onClick={handleSearch}>
                    Search
                </button>

            </div>

            <div className="search-results">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="search-result-row"
                    >
                        <div className="result-user-info">
                            <h3>{user.name}</h3>
                            <p>{user.skills}</p>
                        </div>

                        <div className="result-actions">
                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setPanelMode("request");
                                }}
                            >
                                Request
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setPanelMode("profile");
                                }}
                            >
                                Profile
                            </button>
                        </div>
                    </div>
                            
                ))}

            </div>

        </div>
    );

}

export default PeerInterviewPage;