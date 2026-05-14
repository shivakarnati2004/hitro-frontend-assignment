import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FeedbackModal from './FeedbackModal';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'call-insights', label: 'Call Insights', icon: CallInsightsIcon },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: KnowledgeBaseIcon, hasInfo: true },
  { id: 'prompts', label: 'Prompts', icon: PromptsIcon, hasInfo: true },
  { id: 'boxy-controls', label: 'Boxy Controls', icon: BoxyControlsIcon, hasInfo: true },
];

export default function Sidebar({ subscription, usage, isOpen, onClose }) {
  const { activeNav, setActiveNav, setShowLogoutModal } = useApp();
  const [showFeedback, setShowFeedback] = useState(false);

  const hoursUsed = usage?.kb_files?.used ?? 0;
  const hoursLimit = usage?.kb_files?.limit ?? 1000;

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">Hintro</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="sidebar-nav-icon">
                <item.icon />
              </span>
              <span className="sidebar-nav-label">{item.label}</span>
              {item.hasInfo && (
                <span className="sidebar-nav-info">
                  <InfoIcon />
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-nav-item" onClick={() => setActiveNav('feedback-history')}>
            <span className="sidebar-nav-icon"><FeedbackHistoryIcon /></span>
            <span className="sidebar-nav-label">Feedback History</span>
          </button>

          <button className="sidebar-nav-item" onClick={() => setShowFeedback(true)}>
            <span className="sidebar-nav-icon"><GiftIcon /></span>
            <span className="sidebar-nav-label">Feedback</span>
          </button>

          {!subscription && (
            <div className="sidebar-usage">
              <p className="sidebar-usage-text">
                <strong>{hoursUsed} of {hoursLimit}</strong> hours used
              </p>
              <div className="sidebar-usage-bar">
                <div
                  className="sidebar-usage-fill"
                  style={{ width: `${Math.min((hoursUsed / hoursLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <button className="sidebar-upgrade-btn">Upgrade</button>

          {!subscription && (
            <p className="sidebar-footer">© 2025 Hintro. Made in India 🇮🇳</p>
          )}
        </div>
      </aside>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}

/* ---- SVG Icon Components matching Figma exactly ---- */

/* Dashboard: 4-square grid icon */
function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/* Call Insights: people/contacts icon */
function CallInsightsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 14c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 4.5a2 2 0 110 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 10.5c1.2.6 2 1.6 2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Knowledge Base: document/file icon */
function KnowledgeBaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2h5.5L13 5.5V13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 8h5M6 11h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Prompts: chat bubble / message icon */
function PromptsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 3V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* Boxy Controls: settings/gear icon */
function BoxyControlsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M11.54 3.05l-1.41 1.41M3.05 11.54l1.41 1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Info (ⓘ) icon */
function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Feedback History: clock icon */
function FeedbackHistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Feedback: gift icon */
function GiftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 6v8M2 9h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.5 6c0-1.5 2.5-3 2.5-3s2.5 1.5 2.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 6h10v2H3z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
