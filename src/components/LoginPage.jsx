import React, { useState } from 'react';

function LoginPage({ setLoggedIn, setPage, admins }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const found = admins.find(
      (user) => user.username === username && user.password === password
    );

    if (found) {
      setError('');
      setLoggedIn(true);
      setPage('queue');   // 🔥 Go to Queue after login
    } else {
      setError('❌ Invalid username or password');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(120deg, #ff9a9e 0%, #ff6ec4 40%, #fad0c4 70%, #7873f5 100%)',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
        width: '320px',
        color: '#fff'
      }}>
        <h2>🚀 Smart Queue Login</h2>
        <p>Welcome Admin 👋</p>

        <form onSubmit={handleLogin}>

          <input
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none'
            }}
          />

          <div style={{ display: 'flex', marginBottom: '15px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                marginLeft: '5px',
                borderRadius: '8px',
                border: 'none',
                padding: '10px',
                background: '#7873f5',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: '#7873f5',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔓 Login
          </button>

        </form>

        {error && <p style={{ marginTop: '10px' }}>{error}</p>}
        <p style={{ marginTop: '10px' }}>Demo: admin / 1234 🔑</p>

      </div>
    </div>
  );
}

export default LoginPage;