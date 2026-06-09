import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSession, clearSession } from '../utils/auth';
import { getAvatar } from './Avatar';

/**
 * Navbar — authenticated navigation bar with role-based links,
 * avatar chip, logout dropdown, and mobile hamburger menu.
 *
 * Reads the current session from localStorage on mount and on
 * every route change so it stays in sync after login / logout.
 */
function Navbar() {
  const [session, setSession] = useState(() => getSession());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Re-read session whenever the route changes (login / logout cause navigation)
  useEffect(() => {
    setSession(getSession());
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Build nav links based on role
  const links =
    session?.role === 'admin'
      ? [
          { to: '/blogs', label: 'All Blogs' },
          { to: '/write', label: 'Write' },
          { to: '/users', label: 'Users' },
        ]
      : [
          { to: '/blogs', label: 'All Blogs' },
          { to: '/write', label: 'Write' },
        ];

  const desktopLinkClass = (path) =>
    isActive(path)
      ? 'bg-accent-light text-accent rounded-full px-4 py-1.5 text-sm font-medium'
      : 'text-text-muted hover:text-text px-4 py-1.5 text-sm font-medium transition-colors rounded-full';

  const mobileLinkClass = (path) =>
    isActive(path)
      ? 'bg-accent-light text-accent rounded-xl px-4 py-2.5 text-sm font-medium'
      : 'text-text-muted hover:text-text hover:bg-surface-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl';

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ── Left: Logo ── */}
        <Link
          to="/"
          className="font-display text-xl font-semibold text-text hover:text-accent transition-colors flex-shrink-0"
        >
          WriteSpace
        </Link>

        {/* ── Center: Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={desktopLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right: Avatar + dropdown (desktop) | hamburger (mobile) ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop avatar chip */}
          {session && (
            <div
              className="hidden md:flex items-center gap-2 relative"
              ref={dropdownRef}
            >
              {getAvatar(session.role)}
              <span className="text-sm font-medium text-text">
                {session.displayName}
              </span>

              {/* Dropdown toggle */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="text-text-muted hover:text-text transition-colors p-1 rounded-lg hover:bg-surface-2"
                aria-label="Toggle user menu"
                aria-expanded={dropdownOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${dropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-surface rounded-xl shadow-lg ring-1 ring-border py-1 min-w-[160px] z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-text-muted hover:text-danger hover:bg-danger-light transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-2 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <div
              className={`w-5 h-0.5 bg-text rounded-full transition-transform duration-200 motion-reduce:transition-none ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <div
              className={`w-5 h-0.5 bg-text rounded-full transition-opacity duration-200 motion-reduce:transition-none ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <div
              className={`w-5 h-0.5 bg-text rounded-full transition-transform duration-200 motion-reduce:transition-none ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass(link.to)}
              >
                {link.label}
              </Link>
            ))}

            <hr className="my-2 border-border" />

            <button
              onClick={handleLogout}
              className="text-left text-text-muted hover:text-danger hover:bg-danger-light px-4 py-2.5 text-sm font-medium transition-colors rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {};

export default Navbar;
