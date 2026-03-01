import React, { useState } from 'react';

function Settings({ admins, setAdmins, setPage }) {

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAdmin = () => {

    const trimmedUser = newUsername.trim();
    const trimmedPass = newPassword.trim();

    if (!trimmedUser || !trimmedPass) {
      setMessage("❌ Please fill all fields");
      return;
    }

    const exists = admins.find(
      (admin) => admin.username === trimmedUser
    );

    if (exists) {
      setMessage("⚠️ Username already exists");
      return;
    }

    const updatedAdmins = [
      ...admins,
      { username: trimmedUser, password: trimmedPass }
    ];

    setAdmins(updatedAdmins);

    setMessage("✅ Admin created successfully!");

    setNewUsername('');
    setNewPassword('');
  };

  return (
    <div style={{
      padding: '40px',
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #89f7fe, #66a6ff)'
    }}>

      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '15px',
        width: '350px',
        margin: 'auto',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
      }}>

        <h2>⚙️ Settings - Create Admin</h2>

        <input
          type="text"
          placeholder="👤 New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="🔒 New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleAddAdmin} style={createButton}>
          ➕ Create Admin
        </button>

        {message && <p style={{ marginTop: '10px' }}>{message}</p>}

        <button
          onClick={() => setPage('dashboard')}
          style={backButton}
        >
          ⬅ Back to Dashboard
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const createButton = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  background: '#66a6ff',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const backButton = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  marginTop: '10px',
  background: '#ff6ec4',
  color: '#fff',
  cursor: 'pointer'
};

export default Settings;