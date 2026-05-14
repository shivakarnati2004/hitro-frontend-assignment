# Hintro Dashboard

A pixel-faithful, responsive dashboard implementation for the Hintro Frontend Internship Assignment.

## 🔗 Live Demo
> Deploy to Vercel / Netlify after pushing to GitHub.

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **CSS Variables** | Global theming (no hardcoded colors) |
| **Fetch API** | API integration |
| **localStorage** | Feedback persistence |

## 📦 Setup & Run

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```
App runs at `http://localhost:5173`

### Build for production
```bash
npm run build
npm run preview
```

## 🔑 User States

Switch between users using the toggle in the **header**:

| User | State | Description |
|------|-------|-------------|
| `u1` | Empty | New user — shows "How it works" onboarding and empty call list |
| `u2` | Active | Active user — shows real stats, recent calls with dates |

All data is fetched live from the mock API. **No hardcoded dashboard data.**

## 🌐 API Integration

Base URL: `https://mock-backend-hintro.vercel.app`

| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/profile` | User profile |
| `GET /api/auth/dashboard` | Subscription & usage |
| `GET /api/call-sessions/stats` | Session stats |
| `GET /api/call-sessions?limit=N` | Call history |

All requests include `x-user-id: u1|u2` header.

## 📱 Responsiveness

- **Desktop** (>768px): Full sidebar + multi-column stats grid
- **Tablet** (≤768px): Collapsible sidebar with overlay
- **Mobile** (≤600px): 2-column stats grid, compact layout
- **Small mobile** (≤400px): Single column layout

## ✨ Features

- ✅ Dashboard with real-time stats (Total Sessions, Average Duration, AI Used, Last Session)
- ✅ Recent calls grouped by date with 3-dot context menu
- ✅ Empty state for u1 (How it works onboarding + No Recent Calls)
- ✅ Logout modal ("Leaving already?")
- ✅ Feedback modal with star rating — saved to localStorage
- ✅ Subscription/usage info in sidebar
- ✅ User switcher in header for easy demo
- ✅ Loading skeletons during API fetch
- ✅ Error state with retry button
- ✅ Consistent CSS variables — zero hardcoded colors
- ✅ Smooth transitions and hover states

## 📐 Assumptions & Notes

1. **User Switcher**: Added a visible u1/u2 toggle in the header for easy evaluation — in a real app this would be replaced with actual auth.
2. **Time format**: `averageDuration` from the API is in seconds → displayed as `Xm Ysec` as shown in the Figma.
3. **Last Session**: Taken from the first element of `lastSession[]` array, formatted as relative time ("2 days ago").
4. **Call avatars**: Color is deterministically derived from client name for visual consistency.
5. **Feedback**: Stored in `localStorage` under key `hintro_feedback` as a JSON array.
6. **Navigation**: Only Dashboard is fully implemented; other nav items are structural placeholders.
7. **Fonts**: Using DM Sans (clean, modern sans-serif) to match the Figma aesthetic.

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx / .css
│   ├── Header.jsx / .css
│   ├── StatCard.jsx / .css
│   ├── RecentCalls.jsx / .css
│   ├── HowItWorks.jsx / .css
│   ├── LogoutModal.jsx / .css
│   └── FeedbackModal.jsx / .css
├── context/
│   └── AppContext.jsx
├── pages/
│   └── Dashboard.jsx / .css
├── services/
│   └── api.js
├── utils/
│   └── format.js
├── App.jsx / .css
├── index.css
└── main.jsx
```

---
Made with ❤️ for Hintro Internship Assignment
