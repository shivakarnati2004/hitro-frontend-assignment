import React from 'react';
import { useApp } from '../context/AppContext';
import './LogoutModal.css';

export default function LogoutModal() {
  const { setShowLogoutModal } = useApp();

  function handleLogout() {
    // In a real app, clear tokens and redirect
    setShowLogoutModal(false);
    alert('Logged out successfully!');
  }

  return (
    <div className="modal-backdrop" onClick={() => setShowLogoutModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Leaving already?</h2>
        <hr className="modal-divider" />
        <p className="modal-text">
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </button>
          <button className="modal-btn logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
