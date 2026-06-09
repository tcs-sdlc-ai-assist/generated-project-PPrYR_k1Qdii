import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSession } from '../utils/auth';

/**
 * Route guard wrapper used as a layout route in App.jsx.
 * Redirects unauthenticated users to /login and non-admin users
 * away from admin-only routes.
 *
 * @param {{ role?: string }} props
 * @returns {JSX.Element}
 */
export default function ProtectedRoute({ role }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin' && session.role !== 'admin') {
    return <Navigate to="/blogs" replace />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  /** If "admin", only users with role === 'admin' may pass. */
  role: PropTypes.string,
};
