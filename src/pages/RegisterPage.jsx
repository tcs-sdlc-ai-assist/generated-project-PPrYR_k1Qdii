import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers, saveUsers } from '../utils/storage'
import { getSession, setSession } from '../utils/auth'

/**
 * RegisterPage — public registration route (/register).
 *
 * Renders a full-viewport gradient background with a centred white card
 * containing the registration form. Validates all fields, checks username
 * uniqueness (including the reserved 'admin' username), creates a new user
 * with a UUID, and redirects to /blogs on success.
 */
export default function RegisterPage() {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    // Required fields
    if (
      !displayName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('All fields are required.')
      return
    }

    // Password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Username uniqueness (including reserved 'admin')
    if (username.toLowerCase() === 'admin') {
      setError('Username is already taken.')
      return
    }

    const existingUsers = getUsers()
    const duplicate = existingUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )
    if (duplicate) {
      setError('Username is already taken.')
      return
    }

    setSubmitting(true)

    // Create user
    const newUser = {
      id: crypto.randomUUID(),
      displayName: displayName.trim(),
      username: username.trim(),
      password: password,
      role: 'user',
      createdAt: new Date().toISOString(),
    }

    const updatedUsers = [...existingUsers, newUser]
    saveUsers(updatedUsers)

    setSession({
      userId: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      role: 'user',
    })

    navigate('/blogs', { replace: true })
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-surface rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
        {/* Header */}
        <h1 className="font-display text-2xl font-bold text-text text-center mb-2">
          Create your account
        </h1>
        <p className="text-text-muted text-center mb-8">
          Start writing today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Display Name */}
          <div className="mb-4">
            <label
              htmlFor="register-display-name"
              className="block text-sm font-medium text-text mb-1"
            >
              Display Name
            </label>
            <input
              id="register-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="Jane Doe"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="register-username"
              className="block text-sm font-medium text-text mb-1"
            >
              Username
            </label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="jane_doe"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-medium text-text mb-1"
            >
              Confirm Password
            </label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface transition-shadow"
              placeholder="Confirm your password"
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
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center mt-6 text-sm text-text-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-accent hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
