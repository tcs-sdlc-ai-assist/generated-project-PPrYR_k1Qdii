/**
 * Returns a styled avatar <span> element based on the user role.
 * @param {'admin'|'user'} role - The user's role.
 * @returns {JSX.Element} A styled span with an emoji and background color.
 */
export function getAvatar(role) {
  if (role === 'admin') {
    return (
      <span
        className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0"
        aria-label="Admin avatar"
      >
        👑
      </span>
    );
  }
  return (
    <span
      className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0"
      aria-label="User avatar"
    >
      📖
    </span>
  );
}
