import React, { useState } from 'react';
import { groupCallsByDate, formatTime, getInitials } from '../utils/format';
import './RecentCalls.css';

// Color palette for call avatars
const AVATAR_COLORS = [
  '#6B47DC', '#0d9488', '#f97316', '#e11d48', '#2563eb', '#7c3aed',
];

function getColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function RecentCalls({ calls, loading }) {
  const [openMenu, setOpenMenu] = useState(null);

  if (loading) {
    return (
      <div className="recent-calls-section">
        <h2 className="section-title">Recent calls</h2>
        <div className="calls-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="call-item skeleton-row">
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ width: 140, height: 14 }} />
                <div className="skeleton" style={{ width: 80, height: 12 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!calls || calls.length === 0) {
    return (
      <div className="recent-calls-section">
        <h2 className="section-title">Recent calls</h2>
        <div className="calls-empty">
          <div className="calls-empty-icon">
            <CalendarIcon />
          </div>
          <p className="calls-empty-title">No Recent Calls</p>
          <p className="calls-empty-sub">
            Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
          </p>
          <button className="calls-empty-btn">Start a Call</button>
        </div>
      </div>
    );
  }

  const grouped = groupCallsByDate(calls);

  return (
    <div className="recent-calls-section animate-fade-in">
      <h2 className="section-title">Recent calls</h2>
      <div className="calls-list">
        {Object.entries(grouped).map(([date, sessions]) => (
          <div key={date} className="calls-date-group">
            <p className="calls-date-label">{date}</p>
            {sessions.map((session) => {
              const clientInitial = getInitials(session.client || 'Unknown');
              const avatarColor = getColor(session.client || session._id);
              return (
                <div key={session._id} className="call-item">
                  <div
                    className="call-avatar"
                    style={{ background: avatarColor }}
                  >
                    {clientInitial}
                  </div>
                  <div className="call-info">
                    <p className="call-name">{session.description || 'Call'}</p>
                    <div className="call-participants">
                      {session.participants?.map((p, i) => (
                        <span key={i} className="participant-dot" title={p.name}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" fill="#e5e7eb" stroke="#fff" strokeWidth="1"/>
                            <path d="M7 6a2 2 0 100-4 2 2 0 000 4zM3 11c0-2 2-3 4-3s4 1 4 3v1H3v-1z" fill="#9ca3af"/>
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="call-time">{formatTime(session.started_at)}</span>
                  <div className="call-menu-wrap">
                    <button
                      className="call-menu-btn"
                      onClick={() => setOpenMenu(openMenu === session._id ? null : session._id)}
                    >
                      ⋮
                    </button>
                    {openMenu === session._id && (
                      <div
                        className="call-menu-dropdown"
                        onMouseLeave={() => setOpenMenu(null)}
                      >
                        <button className="call-menu-item">View Details</button>
                        <button className="call-menu-item">View Transcript</button>
                        <button className="call-menu-item danger">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="6" width="26" height="23" rx="4" stroke="var(--color-primary)" strokeWidth="2" />
      <path d="M3 13h26" stroke="var(--color-primary)" strokeWidth="2" />
      <path d="M10 3v6M22 3v6" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="20" r="1.5" fill="var(--color-primary)" />
      <circle cx="16" cy="20" r="1.5" fill="var(--color-primary)" />
      <circle cx="22" cy="20" r="1.5" fill="var(--color-primary)" />
    </svg>
  );
}
