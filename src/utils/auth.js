/**
 * WriteSpace — session management.
 *
 * WARNING: Session is stored in plain text in localStorage.
 * No token expiry, no encryption. Acceptable for MVP demo only.
 *
 * The session object shape:
 *   { userId, username, displayName, role }
 */

const SESSION_KEY = 'writespace_session';

/**
 * Read the current session from localStorage.
 * @returns {object|null} Session object, or null if missing/corrupted.
 */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    // Basic shape validation
    if (parsed && typeof parsed === 'object' && parsed.userId && parsed.role) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Write a session object to localStorage.
 * @param {object} obj — { userId, username, displayName, role }
 */
export function setSession(obj) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(obj));
}

/**
 * Remove the session from localStorage (logout).
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
