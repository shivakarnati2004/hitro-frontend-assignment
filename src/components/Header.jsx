import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Header.css';

export default function Header({ profile, onMenuToggle }) {
  const { userId, setUserId, setShowLogoutModal } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`
    : '?';

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <MenuIcon />
        </button>
        <h1 className="header-title">Dashboard</h1>
      </div>

      <div className="header-right">
        {/* User switcher - visible for demo purposes */}
        <div className="user-switcher">
          <button
            className={`user-switcher-btn ${userId === 'u1' ? 'active' : ''}`}
            onClick={() => setUserId('u1')}
          >
            u1 (Empty)
          </button>
          <button
            className={`user-switcher-btn ${userId === 'u2' ? 'active' : ''}`}
            onClick={() => setUserId('u2')}
          >
            u2 (Active)
          </button>
        </div>

        <button className="header-tutorial-btn">
          <PlayIcon />
          Watch Tutorial
        </button>

        <div className="header-user-menu-wrap">
          <button
            className="header-avatar-btn"
            onClick={() => setShowUserMenu((v) => !v)}
          >
            <div className="header-avatar">
              {initials}
            </div>
            <ChevronIcon />
          </button>

          {showUserMenu && (
            <div className="header-dropdown" onMouseLeave={() => setShowUserMenu(false)}>
              <div className="header-dropdown-user">
                <div className="header-avatar sm">{initials}</div>
                <div>
                  <p className="dropdown-name">
                    {profile ? `${profile.firstName} ${profile.lastName}` : '—'}
                  </p>
                  <p className="dropdown-email">{profile?.email ?? '—'}</p>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button
                className="dropdown-item logout"
                onClick={() => { setShowUserMenu(false); setShowLogoutModal(true); }}
              >
                <LogOutIcon /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polygon points="3,1 13,7 3,13" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5M9.5 10l3-3-3-3M12.5 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
