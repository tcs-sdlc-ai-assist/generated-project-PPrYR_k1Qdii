import { Link } from 'react-router-dom';
import { getSession } from '../utils/auth';
import { getAvatar } from './Avatar';

/**
 * Guest-facing navigation bar shown on the landing page.
 * Displays logo + Login/Get Started for guests, or avatar +
 * dashboard link for already-authenticated visitors.
 */
export default function PublicNavbar() {
  const session = getSession();

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-semibold text-text hover:text-accent transition-colors"
        >
          WriteSpace
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!session ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-text transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-sm font-medium bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                {getAvatar(session.role)}
                <span className="text-sm font-medium text-text">
                  {session.username}
                </span>
              </div>
              <Link
                to={session.role === 'admin' ? '/admin' : '/blogs'}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
              >
                Go to Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
