/**
 * WriteSpace — localStorage persistence layer for posts and users.
 *
 * WARNING: All data is stored in plain text. No encryption.
 * Do NOT use real passwords. This is an MVP demo.
 *
 * All reads are wrapped in try/catch with [] fallback to handle
 * corrupted or unavailable localStorage gracefully.
 */

const POSTS_KEY = 'writespace_posts';
const USERS_KEY = 'writespace_users';

/**
 * Read the posts array from localStorage.
 * @returns {Array} Parsed posts array, or [] if missing/corrupted.
 */
export function getPosts() {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist the posts array to localStorage.
 * @param {Array} arr — Array of post objects.
 */
export function savePosts(arr) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(arr));
}

/**
 * Read the users array from localStorage.
 * @returns {Array} Parsed users array, or [] if missing/corrupted.
 */
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist the users array to localStorage.
 * @param {Array} arr — Array of user objects.
 */
export function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
