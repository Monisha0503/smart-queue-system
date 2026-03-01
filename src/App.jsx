import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import QueuePage from './components/QueuePage';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('login');   // ✅ Start at login

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem("queue");
    return saved ? JSON.parse(saved) : [];
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completed");
    return saved ? JSON.parse(saved) : [];
  });

  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem("counters");
    return saved ? JSON.parse(saved) : ["Counter 1", "Counter 2", "Counter 3"];
  });

  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem("admins");
    if (saved && JSON.parse(saved).length > 0) {
      return JSON.parse(saved);
    }
    return [{ username: "admin", password: "1234" }];
  });

  // ✅ Persist Data
  useEffect(() => localStorage.setItem("queue", JSON.stringify(queue)), [queue]);
  useEffect(() => localStorage.setItem("completed", JSON.stringify(completed)), [completed]);
  useEffect(() => localStorage.setItem("counters", JSON.stringify(counters)), [counters]);
  useEffect(() => localStorage.setItem("admins", JSON.stringify(admins)), [admins]);
  useEffect(() => localStorage.setItem("darkMode", JSON.stringify(darkMode)), [darkMode]);

  const sideBtn = (active) => ({
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    background: active ? '#7873f5' : 'transparent',
    color: '#fff',
    fontWeight: 'bold'
  });

  return (
    <div style={{
      fontFamily: 'Arial',
      minHeight: '100vh',
      background: darkMode ? '#1e1e2f' : '#f5f5f5',
      color: darkMode ? '#fff' : '#000'
    }}>

      {/* 🔐 LOGIN SCREEN */}
      {!loggedIn && (
        <LoginPage
          setLoggedIn={(value) => {
            setLoggedIn(value);
            if (value) setPage('queue');   // ✅ Go to queue after login
          }}
          setPage={setPage}
          admins={admins}
        />
      )}

      {/* 🖥 AFTER LOGIN */}
      {loggedIn && (
        <div style={{ display: 'flex' }}>

          {/* Sidebar */}
          <div style={{
            width: '220px',
            background: '#ff6ec4',
            padding: '20px',
            minHeight: '100vh',
            color: '#fff'
          }}>
            <h3>🚀 Smart Queue</h3>

            <button style={sideBtn(page === 'dashboard')} onClick={() => setPage('dashboard')}>
              🏠 Dashboard
            </button>

            <button style={sideBtn(page === 'queue')} onClick={() => setPage('queue')}>
              📝 Queue
            </button>

            <button style={sideBtn(page === 'reports')} onClick={() => setPage('reports')}>
              📊 Reports
            </button>

            <button style={sideBtn(page === 'settings')} onClick={() => setPage('settings')}>
              ⚙️ Settings
            </button>

            <button onClick={() => setDarkMode(!darkMode)} style={sideBtn(false)}>
              {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
            </button>

            <button
              onClick={() => {
                setLoggedIn(false);
                setPage('login');   // ✅ Proper reset
              }}
              style={{ ...sideBtn(false), background: '#ff1a4d' }}
            >
              🚪 Logout
            </button>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: '30px' }}>

            {page === 'dashboard' && (
              <Dashboard
                queue={queue}
                completed={completed}
                setQueue={setQueue}
                setCompleted={setCompleted}
                counters={counters}
                darkMode={darkMode}
              />
            )}

            {page === 'queue' && (
              <QueuePage
                queue={queue}
                setQueue={setQueue}
                counters={counters}
                goToDashboard={() => setPage('dashboard')}
              />
            )}

            {page === 'reports' && (
              <Reports queue={queue} completed={completed} />
            )}

            {page === 'settings' && (
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                counters={counters}
                setCounters={setCounters}
                admins={admins}
                setAdmins={setAdmins}
              />
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;