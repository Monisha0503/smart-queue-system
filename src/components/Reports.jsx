import React from 'react';

function Reports({ queue, completed }) {

  const allTickets = [...queue, ...completed];

  const total = allTickets.length;
  const waiting = queue.length;
  const served = completed.length;

  const hospital = allTickets.filter(t => t.category === "Hospital").length;
  const company = allTickets.filter(t => t.category === "Company").length;
  const movie = allTickets.filter(t => t.category === "Movie").length;

  const completionRate = total > 0
    ? ((served / total) * 100).toFixed(1)
    : 0;

  return (
    <div style={containerStyle}>

      <h2 style={headingStyle}>
        📊 Smart Queue Reports & Analytics
      </h2>

      <div style={summaryCard}>
        <p>🧾 Total Tickets Created: <strong>{total}</strong></p>
        <p>⏳ Currently Waiting: <strong>{waiting}</strong></p>
        <p>✅ Successfully Served: <strong>{served}</strong></p>
        <p>📈 Completion Rate: <strong>{completionRate}%</strong></p>
      </div>

      <div style={categoryCard}>
        <h3>📂 Category Breakdown</h3>
        <p>🏥 Hospital Visits: {hospital}</p>
        <p>🏢 Company Appointments: {company}</p>
        <p>🎬 Movie Bookings: {movie}</p>
      </div>

      <div style={systemCard}>
        <h3>📌 System Summary</h3>
        <p>⚡ Queue Efficiency: {completionRate}%</p>
        <p>🎯 Active Tickets: {waiting}</p>
        <p>🏁 Finished Today: {served}</p>
      </div>

    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  padding: '30px',
  minHeight: '90vh',
  background: 'linear-gradient(135deg, #134e5e, #71b280)',
  borderRadius: '15px',
  color: '#ffffff'
};

const headingStyle = {
  marginBottom: '25px'
};

const baseCard = {
  padding: '20px',
  borderRadius: '14px',
  marginTop: '20px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
  color: '#1e293b'
};

const summaryCard = {
  ...baseCard,
  background: '#fff3e0'   // Light Peach
};

const categoryCard = {
  ...baseCard,
  background: '#e8f5e9'   // Light Mint
};

const systemCard = {
  ...baseCard,
  background: '#e3f2fd'   // Light Sky Blue
};

export default Reports;