<h1 align="center">
  Hintro Dashboard
</h1>

<p align="center">
  <strong>A pixel-perfect, responsive React dashboard built for the Hintro Frontend Assignment.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS-Variables-1572B6?logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/API-Mock Backend-green" alt="API" />
</p>

---

## 📋 Overview

This project implements the **Hintro Dashboard** frontend, faithfully reproducing the provided Figma design with full API integration, responsive layouts, and production-grade code architecture.

### Key Highlights

- **Pixel-perfect Figma implementation** — every component, spacing, icon, and color matches the design
- **Two-user state system** — toggle between `u1` (empty/new user) and `u2` (active user with data)
- **Zero hardcoded colors** — entire theme powered by CSS custom properties in a single design token file
- **Live API integration** — all data fetched from the Hintro mock backend, nothing hardcoded
- **Responsive design** — 4 breakpoints (1024px, 768px, 600px, 400px) for desktop → mobile
- **Smooth micro-animations** — fade-in, scale-in, shimmer loading skeletons, hover transitions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/shivakarnati2004/hitro-frontend-assignment.git
cd hitro-frontend-assignment

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview    # Preview the production build locally
```

### Deployment (Render Free Tier)

This repository includes a `render.yaml` Blueprint file for seamless 1-click deployment on [Render](https://render.com) using their free Static Site tier.

1. Create an account on Render.com
2. Go to the **Dashboard** and click **New +** > **Blueprint**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file and deploy the application.
   - **Environment:** `static`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `./dist`
   - SPA routing is automatically handled via rewrite rules.

---

## 🏗️ Project Architecture

```
src/
├── main.jsx                    # Application entry point
├── App.jsx                     # Root layout — sidebar + header + content
├── App.css                     # Root layout styles
├── index.css                   # 🎨 Design tokens (CSS variables, animations, global resets)
│
├── context/
│   └── AppContext.jsx          # Global state — user ID, active nav, modal toggles
│
├── pages/
│   ├── Dashboard.jsx           # Main dashboard page — stats, calls, "How it works"
│   └── Dashboard.css           # Dashboard page styles
│
├── components/
│   ├── Sidebar.jsx / .css      # Navigation sidebar with user-conditional bottom section
│   ├── Header.jsx / .css       # Top header — title, user switcher, avatar dropdown
│   ├── StatCard.jsx / .css     # Reusable stat card (Total Sessions, Duration, etc.)
│   ├── RecentCalls.jsx / .css  # Call list with grouped dates, avatars, 3-dot menu
│   ├── HowItWorks.jsx / .css   # Onboarding 3-step cards (empty state only)
│   ├── LogoutModal.jsx / .css  # Confirmation modal for logging out
│   └── FeedbackModal.jsx / .css# 3-step feedback flow (stars → text → thanks)
│
├── services/
│   └── api.js                  # Centralized API client with x-user-id header
│
└── utils/
    └── format.js               # Date/time/duration formatting utilities
```

---

## 🎨 Design System

All colors, typography, spacing, shadows, and radii are defined as **CSS custom properties** in [`src/index.css`](src/index.css). **No hardcoded hex values exist** in any component or CSS file.

| Token Category | Examples |
|---|---|
| **Colors** | `--color-primary`, `--color-text-primary`, `--color-bg` |
| **Stat Cards** | `--color-stat-orange`, `--color-stat-teal`, `--color-stat-green`, `--color-stat-purple` |
| **Avatars** | `--color-avatar-1` through `--color-avatar-6` |
| **Typography** | `--font-sans` (DM Sans), `--font-serif` (Instrument Serif) |
| **Spacing** | `--sidebar-width`, `--header-height` |
| **Shadows** | `--shadow-card`, `--shadow-modal` |
| **Radii** | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |

---

## 🔌 API Integration

All data is fetched from the **Hintro Mock Backend**:

```
Base URL: https://mock-backend-hintro.vercel.app
```

| Endpoint | Purpose | Header |
|---|---|---|
| `GET /api/auth/profile` | User profile (name, email) | `x-user-id: u1 \| u2` |
| `GET /api/auth/dashboard` | Subscription & usage data | `x-user-id: u1 \| u2` |
| `GET /api/call-sessions/stats` | Aggregate statistics | `x-user-id: u1 \| u2` |
| `GET /api/call-sessions?limit=20` | Call history list | `x-user-id: u1 \| u2` |

### User States

| User | Name | State | Sidebar |
|---|---|---|---|
| `u1` | John Doe | Empty — 0 sessions, no calls | Usage bar, "How it works", footer |
| `u2` | Jane Smith | Active — random data on each call | Feedback History, call list |

### Data Formatting

| API Field | Raw Value | Displayed As |
|---|---|---|
| `averageDuration` | `862` (seconds) | `14m 22sec` |
| `lastSession[0]` | `2026-05-09T07:05:53Z` | `5 days ago` |
| `started_at` | `2026-05-08T11:00:00Z` | `11:00 am` |
| Date grouping | ISO timestamps | `May 8th`, `April 29th` |

---

## ✨ Features

### Core Functionality
- ✅ **User Switcher** — toggle between u1/u2 via header pills
- ✅ **Stat Cards** — Total Sessions, Average Duration, AI Used, Last Session
- ✅ **Recent Calls** — grouped by date with colored avatars and participant icons
- ✅ **How It Works** — onboarding 3-step flow for empty users
- ✅ **Empty States** — graceful UI for zero data (stats show "0", "-")

### Interactions
- ✅ **Logout Modal** — "Leaving already?" confirmation with Cancel/Log out
- ✅ **Feedback Modal** — 3-step flow: star rating → text input → thank you
- ✅ **Feedback Persistence** — stored in `localStorage` under `hintro_feedback`
- ✅ **Avatar Dropdown** — click profile icon to reveal "Log out" option
- ✅ **Call Menu** — 3-dot menu with View Details, View Transcript, Delete

### Polish
- ✅ **Loading Skeletons** — shimmer animations while data loads
- ✅ **Fade-in Animations** — content appears with smooth transitions
- ✅ **Hover States** — every interactive element has visual feedback
- ✅ **Responsive** — adapts from desktop (1440px+) to mobile (320px)

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| **≤ 1024px** | Stat cards compress, smaller font sizes |
| **≤ 768px** | Sidebar collapses to hamburger menu, tutorial button hidden |
| **≤ 600px** | Stats become 2×2 grid, padding reduces |
| **≤ 400px** | Stats become single column |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with functional components and hooks |
| **Vite 5** | Build tool and dev server |
| **CSS Custom Properties** | Theming and design tokens |
| **Context API** | Global state management (no external deps) |
| **Fetch API** | HTTP client for mock backend |
| **localStorage** | Feedback data persistence |

---

## 📂 Environment Variables

```env
VITE_API_BASE_URL=https://mock-backend-hintro.vercel.app
```

Copy `.env.example` to `.env` before running. The default value is already configured.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

---

## 🧪 Testing Checklist

- [x] u2 (Active): Stats show data, recent calls with dates/times
- [x] u1 (Empty): Stats show 0/0/0/-, "How it works" section, empty call state
- [x] User switching updates all data via API
- [x] Avatar dropdown shows "Log out" only
- [x] Logout modal with correct text and Cancel/Log out buttons
- [x] Feedback modal: star rating → text → thank you → localStorage
- [x] Responsive: sidebar collapses on mobile, stats reflow
- [x] Zero hardcoded colors — all via CSS variables
- [x] Time formatting matches Figma: "Xm Ysec", "X days ago", "11:00 am"
- [x] Production build succeeds (`npm run build`)

---

## 📌 Assumptions & Notes

While building the project, the following assumptions and design decisions were made to ensure a robust and production-ready implementation:

1. **API Data Truth vs. Figma Mocks:** Where the API returns data that conflicts slightly with the Figma mockup (e.g., `limit` being `100` in the API vs `1000` in the image), the **API data is treated as the source of truth** to avoid hardcoding values. The UI automatically adapts to whatever the API returns.
2. **Local Storage Feedback:** The feedback submitted through the modal is saved to the browser's `localStorage` under the key `hintro_feedback`. This simulates a successful POST request without requiring a real backend endpoint.
3. **Avatar Initials:** The initials generated for the recent calls use a simple hashing algorithm on the client name to consistently generate the same background color for the same user, providing a stable visual experience.
4. **Time & Date Formatting:** The backend returns raw ISO timestamps and durations in seconds. All formatting logic (e.g., "14m 22sec", "5 days ago") is isolated in utility functions (`src/utils/format.js`) to ensure UI consistency across all components.
5. **Static Deployment:** The application does not require a Node.js server to run in production. It compiles down to pure HTML, CSS, and JS, making it perfectly suited for free-tier static hosting (like Render Static Sites or Vercel).

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ for the Hintro Frontend Assignment
</p>
