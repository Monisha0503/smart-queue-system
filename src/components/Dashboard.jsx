import React, { useState, useEffect } from 'react';

function QueuePage({ queue, setQueue, goToDashboard }) {

  const [category, setCategory] = useState('Hospital');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [problem, setProblem] = useState('');
  const [mode, setMode] = useState('Live');
  const [degree, setDegree] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [movieName, setMovieName] = useState('');

  const addToQueue = () => {

    if (!name.trim()) {
      alert("⚠ Please enter name");
      return;
    }

    const ticket = {
      id: Date.now(),
      category,
      name,
      age,
      problem,
      mode,
      degree,
      jobRole,
      movieName,
      time: new Date().toISOString(),
      servedTime: null
    };

    setQueue([...queue, ticket]);

    // Reset fields
    setName('');
    setAge('');
    setProblem('');
    setDegree('');
    setJobRole('');
    setMovieName('');
  };

  // 🔁 Live timer refresh
  const [, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 AUTO GO TO DASHBOARD AFTER 3 TICKETS
  useEffect(() => {
    if (queue.length === 3) {
      goToDashboard();
    }
  }, [queue, goToDashboard]);

  const formatTime = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div style={{
      padding: '30px',
      background: 'linear-gradient(135deg, #f9d5e5, #a18cd1)',
      minHeight: '90vh',
      borderRadius: '15px',
      color: '#fff'
    }}>

      <h2>📝 Queue Management</h2>
      <p>📊 Total Tickets: {queue.length}</p>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="Hospital">🏥 Hospital</option>
        <option value="Company">🏢 Company</option>
        <option value="Movie">🎬 Movie</option>
      </select>

      {/* Name */}
      <input
        placeholder="🙋 Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      {/* Hospital Fields */}
      {category === 'Hospital' && (
        <>
          <input
            placeholder="Age 👶"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Problem 🤒"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            style={inputStyle}
          />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={inputStyle}
          >
            <option value="Live">🏥 Live</option>
            <option value="Online">💻 Online</option>
          </select>
        </>
      )}

      {/* Company Fields */}
      {category === 'Company' && (
        <>
          <input
            placeholder="Degree 🎓"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Job Role 💼"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            style={inputStyle}
          />
        </>
      )}

      {/* Movie Field */}
      {category === 'Movie' && (
        <input
          placeholder="Movie Name 🎥"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          style={inputStyle}
        />
      )}

      <button onClick={addToQueue} style={buttonStyle}>
        ➕ Add Ticket
      </button>

      {/* Queue List */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {queue.map((item, index) => (
          <li
            key={item.id}
            style={{
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '12px',
              background: index === 0
                ? 'linear-gradient(90deg, #ffd700, #ff6ec4)'
                : 'linear-gradient(90deg, #ff9ec4, #c3a6ff)'
            }}
          >
            🎫 #{index + 1} | 🙋 {item.name} | 🏷 {item.category} |
            ⏱ {formatTime(item.time)} waiting
          </li>
        ))}
      </ul>

    </div>
  );
}

const inputStyle = {
  display: 'block',
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  marginBottom: '10px'
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  background: '#ff6ec4',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default QueuePage;
