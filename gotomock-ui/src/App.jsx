import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users/available") 
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>GoToMock - Discovery Feed</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {users.map((user) => (
          <div key={user.id} style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
            width: '200px'
          }}>
            <h3>{user.name}</h3>
            <p><strong>@{user.username}</strong></p>
            <p>Skills: {user.skills}</p>
            <button style={{backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px'}}>
              Request Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
