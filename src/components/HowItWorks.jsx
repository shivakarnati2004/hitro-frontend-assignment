import React from 'react';
import './HowItWorks.css';

const STEPS = [
  {
    number: 'STEP 1',
    icon: <UploadIcon />,
    title: 'Upload your files',
    description: 'Add files for your meetings and meetings with Hintro',
    action: 'Upload Files',
  },
  {
    number: 'STEP 2',
    icon: <CallIcon />,
    title: 'Start a Call',
    description: 'Begin your AI-powered meeting session anytime',
    action: 'Start a Call',
  },
  {
    number: 'STEP 3',
    icon: <InsightsIcon />,
    title: 'View Insights',
    description: 'Review notes and action items after the call',
    action: 'View Insights',
  },
];

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2 className="section-title">How it works</h2>
      <div className="steps-grid">
        {STEPS.map((step, i) => (
          <div key={i} className="step-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <p className="step-number">{step.number}</p>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.description}</p>
            <button className="step-btn">{step.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 18V10M10 14l4-4 4 4" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20a4 4 0 01.9-7.9A6 6 0 0120 10a5 5 0 010 10H5z" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="14" rx="3" stroke="var(--color-text-secondary)" strokeWidth="1.8" />
      <path d="M10 24h8M14 20v4" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="13" r="3" stroke="var(--color-text-secondary)" strokeWidth="1.8" />
    </svg>
  );
}

function InsightsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="4" stroke="var(--color-text-secondary)" strokeWidth="1.8" />
      <path d="M9 19l3-4 3 3 4-6" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
