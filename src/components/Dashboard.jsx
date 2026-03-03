import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

function Dashboard({ queue, completed, setQueue, setCompleted, counters, darkMode }) {
  const [time, setTime] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCounter, setSelectedCounter] = useState(counters[0] || "Counter 1");

  // Live clock
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Next token
  const nextToken = () => {
    if (queue.length === 0) {
      alert("🎉 No tokens waiting!");
      return;
    }

    const [next, ...rest] = queue;
    const servedTime = new Date();
    const waitingSeconds = Math.max(0, Math.floor((servedTime.getTime() - new Date(next.time).getTime()) / 1000));

    const updatedToken = {
      ...next,
      counter: selectedCounter,
      servedTime: servedTime.toISOString(),
      waitingDuration: waitingSeconds
    };

    setQueue(rest);
    setCompleted([updatedToken, ...completed]);
  };

  // Filter lists
  const filteredQueue = queue.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const filteredCompleted = completed.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SMART QUEUE REPORT", 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

    let y = 40;
    completed.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} | ${item.category} | ${item.counter} | Wait: ${formatDuration(item.waitingDuration || 0)}`, 20, y);
      y += 8;
    });

    doc.save("SmartQueueReport.pdf");
  };

  // Clear all
  const clearAllData = () => {
    if (!window.confirm("Are you sure you want to clear all data?")) return;
    setQueue([]);
    setCompleted([]);
    localStorage.removeItem("queue");
    localStorage.removeItem("completed");
  };

  const total = queue.length + completed.length;
  const progress = total === 0 ? 0 : Math.round((completed.length / total) * 100);
  const bg = darkMode ? "linear-gradient(135deg, #1e1e2f, #2c2c3e)" : "linear-gradient(135deg, #c3a6ff, #ff9ec4)";

  const formatDuration = (seconds) => {
    if (!seconds) return "0m 00s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <div style={{ padding: "30px", minHeight: "95vh", background: bg, borderRadius: "15px", color: "#fff" }}>
      <h2>📊 Dashboard</h2>
      <p>⏰ Current Time: {time}</p>

      {/* Search + Counter */}
      <div style={{ marginBottom: "15px" }}>
        <input type="text" placeholder="🔍 Search by name..." value={search} onChange={e => setSearch(e.target.value)} style={inputStyle} />
        <select value={selectedCounter} onChange={e => setSelectedCounter(e.target.value)} style={{ ...inputStyle, marginLeft: "10px" }}>
          {counters.map((c, i) => <option key={i}>{c}</option>)}
        </select>
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={downloadPDF} style={btn}>📄 Download PDF</button>
        <button onClick={clearAllData} style={{ ...btn, background: "red", marginLeft: "10px" }}>🗑 Clear Data</button>
      </div>

      {/* Stats */}
      <p>🧾 Total: {total}</p>
      <p>✅ Completed: {completed.length}</p>
      <p>⏳ Waiting: {queue.length}</p>

      {/* Progress bar */}
      <div style={{ height: "20px", background: "#ddd", borderRadius: "10px", overflow: "hidden", marginBottom: "15px" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "#4caf50", transition: "0.4s" }} />
      </div>
      <p>📈 {progress}% Completed</p>

      {/* Next token */}
      <button onClick={nextToken} style={btn}>▶️ Next Token</button>

      {/* Waiting Queue */}
      <h3 style={{ marginTop: "30px" }}>🧾 Waiting Queue</h3>
      {filteredQueue.length === 0 ? <p>No tickets found</p> :
        filteredQueue.map(item => (
          <div key={item.id} style={cardStyle}>🎫 #{item.id} | 🙋 {item.name} | 🏷 {item.category}</div>
        ))
      }

      {/* Completed List */}
      <h3 style={{ marginTop: "25px" }}>✅ Completed</h3>
      {filteredCompleted.length === 0 ? <p>No tickets found</p> :
        filteredCompleted.map(item => (
          <div key={item.id} style={completedStyle}>
            <div>✅ {item.name} | 🏢 {item.counter}</div>
            <div style={{ fontSize: "14px", marginTop: "5px" }}>⏱ Waited: {formatDuration(item.waitingDuration || 0)}</div>
            <div style={{ fontSize: "14px" }}>🕒 Served At: {item.servedTime ? new Date(item.servedTime).toLocaleTimeString() : "-"}</div>
          </div>
        ))
      }
    </div>
  );
}

const inputStyle = { padding: "8px", borderRadius: "8px", border: "none" };
const btn = { padding: "10px 15px", borderRadius: "8px", border: "none", background: "#ff6ec4", color: "#fff", fontWeight: "bold", cursor: "pointer" };
const cardStyle = { padding: "10px", marginBottom: "8px", borderRadius: "12px", background: "linear-gradient(90deg,#ff9ec4,#c3a6ff)" };
const completedStyle = { padding: "10px", marginBottom: "8px", borderRadius: "12px", background: "linear-gradient(90deg,#d5f7e5,#a0f7c5)", color: "#000" };

export default Dashboard;
