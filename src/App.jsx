import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LogoutModal from './components/LogoutModal';
import Dashboard from './pages/Dashboard';
import { api } from './services/api';
import './App.css';

function AppLayout() {
  const { userId, showLogoutModal } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState({ subscription: null, usage: null });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [prof, dash] = await Promise.all([
          api.getProfile(userId),
          api.getDashboard(userId),
        ]);
        setProfile(prof);
        setSidebarData({ subscription: dash.subscription, usage: dash.usage });
      } catch (e) {
        console.error('Failed to load sidebar data', e);
      }
    }
    loadSidebarData();
  }, [userId]);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        subscription={sidebarData.subscription}
        usage={sidebarData.usage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="app-main">
        <Header
          profile={profile}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className="app-content">
          <Dashboard />
        </div>
      </div>

      {showLogoutModal && <LogoutModal />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
