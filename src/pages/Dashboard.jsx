import React, { useEffect, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { formatDuration, formatRelativeTime, getLastSessionDate } from '../utils/format';
import StatCard from '../components/StatCard';
import RecentCalls from '../components/RecentCalls';
import HowItWorks from '../components/HowItWorks';
import './Dashboard.css';

export default function Dashboard() {
  const { userId } = useApp();
  const [data, setData] = useState({
    profile: null,
    stats: null,
    calls: null,
    subscription: null,
    loading: true,
    error: null,
  });

  const fetchAll = useCallback(async () => {
    setData((d) => ({ ...d, loading: true, error: null }));
    try {
      const [profile, dashboard, stats, callHistory] = await Promise.all([
        api.getProfile(userId),
        api.getDashboard(userId),
        api.getCallStats(userId),
        api.getCallHistory(userId, 20),
      ]);
      setData({
        profile,
        stats,
        calls: callHistory.callSessions,
        subscription: dashboard.subscription,
        usage: dashboard.usage,
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((d) => ({ ...d, loading: false, error: err.message }));
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const { profile, stats, calls, subscription, usage, loading, error } = data;
  const firstName = profile?.firstName ?? '';
  const isEmptyUser = !stats?.totalSessions && !calls?.length;

  // Format stats for display
  const totalSessions = stats?.totalSessions ?? 0;
  const avgDuration = formatDuration(stats?.averageDuration ?? 0);
  const aiUsed = stats?.totalAIInteractions ?? 0;
  const lastSession = getLastSessionDate(stats?.lastSession);
  const lastSessionDisplay = lastSession ? formatRelativeTime(lastSession) : '—';

  return (
    <main className="dashboard">
      {/* Welcome header */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-text">
          <h2 className="welcome-heading">
            Hi, {firstName || (loading ? '...' : 'there')} 👋 Welcome to Hintro
          </h2>
          <p className="welcome-sub">Ready to make your next call smarter?</p>
        </div>
        <button className="start-call-btn">Start New Call</button>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ Failed to load data: {error}</span>
          <button onClick={fetchAll}>Retry</button>
        </div>
      )}

      {/* Stats row */}
      <div className="stats-grid">
        <StatCard
          icon={<PieChartIcon />}
          label="Total Sessions"
          value={loading ? '—' : totalSessions}
          colorClass="orange"
          loading={loading}
        />
        <StatCard
          icon={<ClockIcon />}
          label="Average Duration"
          value={loading ? '—' : avgDuration}
          colorClass="teal"
          loading={loading}
        />
        <StatCard
          icon={<SparkleIcon />}
          label="AI Used"
          value={loading ? '—' : aiUsed === 0 ? '0' : `${aiUsed} times`}
          colorClass="green"
          loading={loading}
        />
        <StatCard
          icon={<CalendarIcon />}
          label="Last Session"
          value={loading ? '—' : lastSessionDisplay}
          colorClass="purple"
          loading={loading}
        />
      </div>

      {/* How it works (u1 empty) or Recent calls (u2) */}
      {!loading && isEmptyUser ? (
        <HowItWorks />
      ) : null}

      {/* Recent calls always shown (empty state handled inside) */}
      <RecentCalls calls={calls ?? []} loading={loading} />
    </main>
  );
}

/* ---- Stat Icons ---- */
function PieChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2A9 9 0 1020 11H11V2z" fill="currentColor" opacity="0.7" />
      <path d="M13 2.46A9 9 0 0119.54 9H13V2.46z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M11 6v5.5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2l1.8 6.2H19l-5.1 3.7 1.9 6.1L11 14.4l-4.8 3.6 1.9-6.1L3 8.2h6.2z" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="5" r="2" fill="currentColor" />
      <circle cx="5" cy="17" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h16" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M14 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="15" r="1.2" fill="currentColor" />
      <circle cx="11" cy="15" r="1.2" fill="currentColor" />
      <circle cx="14" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}
