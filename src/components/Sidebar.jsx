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
          <LogoIcon />
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

          {subscription ? (
            <div className="sidebar-plan-badge">
              <span className="plan-name">{subscription.plan}</span>
              <span className="plan-status">{subscription.status}</span>
            </div>
          ) : (
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

          <p className="sidebar-footer">© 2025 Hintro. Made in India 🇮🇳</p>
        </div>
      </aside>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}

/* ---- SVG Icon Components ---- */
function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="var(--color-primary)" />
      <path d="M8 9h4v10H8zM16 9h4v10h-4z" fill="white" opacity="0.9" />
      <rect x="12" y="12" width="4" height="4" rx="1" fill="white" />
    </svg>
  );
}

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

function CallInsightsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 14s0-5 3.5-5S10 14 10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 7s1 1 1 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function KnowledgeBaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2h7l3 3v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 8h5M6 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PromptsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12v8H2z" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 13h6M8 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoxyControlsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M11.54 3.05l-1.41 1.41M3.05 11.54l1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FeedbackHistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
