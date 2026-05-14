/**
 * Format seconds into "Xm Ysec" display format
 */
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0m 0sec';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}sec`;
  return `${mins}m ${secs}sec`;
}

/**
 * Format a date string to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMins > 0) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Format date to "April 29th" style
 */
export function formatDateLabel(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
      ? 'nd'
      : day === 3 || day === 23
      ? 'rd'
      : 'th';
  return `${month} ${day}${suffix}`;
}

/**
 * Format time to "11:00 am" style
 */
export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();
}

/**
 * Group call sessions by date label
 */
export function groupCallsByDate(calls) {
  const groups = {};
  calls.forEach((call) => {
    const label = formatDateLabel(call.started_at);
    if (!groups[label]) groups[label] = [];
    groups[label].push(call);
  });
  return groups;
}

/**
 * Get user initials from name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Get first session from lastSession array
 */
export function getLastSessionDate(lastSessionArr) {
  if (!lastSessionArr || lastSessionArr.length === 0) return null;
  return lastSessionArr[0];
}
