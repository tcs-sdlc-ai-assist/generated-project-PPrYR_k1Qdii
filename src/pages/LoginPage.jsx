import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../utils/storage'
import { getSession, setSession } from '../utils/auth'

/**
 * LoginPage — public login route (/login).
 *
 * Renders a full-viewport gradient background with a centred white card
 * containing the login form. Checks hard-coded admin credentials first,
 * then falls back to localStorage users. Already-authenticated visitors
 * are redirected to their dashboard.
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (session) {
      navigate(session.role === 'admin' ? '/admin' : '/blogs', {
        replace: true,
      })
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    setSubmitting(true)

    // Hard-coded admin check
    if (username === 'admin' && password === 'admin') {
      setSession({
        userId: 'admin',
        username: 'admin',
        displayName: 'Admin',
        role: 'admin',
      })
      navigate('/admin', { replace: true })
      return
    }

    // Check localStorage users
    const users = getUsers()
    const found = users.find(
      (u) => u.username === username && u.password === password
    )

    if (found) {
      setSession({
        userId: found.id,
        username: found.username,
        displayName: found.displayName,
        role: found.role,
      })
      navigate(found.role === 'admin' ? '/admin' : '/blogs', {
        replace: true,
      })
    } else {
      setError('Invalid username or password.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-surface rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
        {/* Header */}
        <h1 className="font-display text-2xl font-bold text-text text-center mb-2">
          WriteSpace
        </h1>
        <p className="text-text-muted text-center mb-8">Welcome back</p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="login-username"
              className="block text-sm font-medium text-text mb-1"
            >
              Username
            </label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="text-danger text-sm mt-2 bg-danger-light rounded-lg px-3 py-2 flex items-center gap-2"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-accent-fg py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center mt-6 text-sm text-text-muted">
          Don&rsquo;t have an account?{' '}
          <Link
            to="/register"
            className="text-accent hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
