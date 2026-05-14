import React from 'react';
import './StatCard.css';

export default function StatCard({ icon, label, value, colorClass, loading }) {
  if (loading) {
    return (
      <div className="stat-card">
        <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton" style={{ width: 100, height: 14 }} />
          <div className="skeleton" style={{ width: 70, height: 22 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card animate-fade-in">
      <div className={`stat-icon ${colorClass}`}>
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
