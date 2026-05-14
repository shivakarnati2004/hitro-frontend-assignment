const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mock-backend-hintro.vercel.app';

async function fetchApi(endpoint, userId) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export const api = {
  getProfile: (userId) => fetchApi('/api/auth/profile', userId),
  getDashboard: (userId) => fetchApi('/api/auth/dashboard', userId),
  getCallStats: (userId) => fetchApi('/api/call-sessions/stats', userId),
  getCallHistory: (userId, limit = 10) =>
    fetchApi(`/api/call-sessions?limit=${limit}`, userId),
};
