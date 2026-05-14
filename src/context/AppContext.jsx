import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userId, setUserId] = useState('u2'); // default u2 so we see data first
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        showLogoutModal,
        setShowLogoutModal,
        activeNav,
        setActiveNav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
