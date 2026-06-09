import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPosts } from '../utils/storage'
import { getSession } from '../utils/auth'
import BlogCard from '../components/BlogCard'

/**
 * LandingPage — public landing route (/).
 *
 * Renders a full-viewport gradient hero, a features section,
 * a latest-posts preview (up to 3), and a dark footer.
 * Authenticated visitors are redirected to their dashboard.
 */
export default function LandingPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const session = getSession()

  useEffect(() => {
    if (session) {
      navigate(session.role === 'admin' ? '/admin' : '/blogs', { replace: true })
      return
    }

    const allPosts = getPosts()
    const sorted = allPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    setPosts(sorted.slice(0, 3))
    setLoading(false)
  }, [session, navigate])

  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="min-h-[100svh] bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 flex items-center">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left — copy */}
            <div className="md:col-span-7">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white">
                WriteSpace
              </h1>
              <p className="text-lg md:text-xl text-white/80 mt-6 max-w-lg leading-relaxed">
                Your thoughts. Your space. Beautifully simple.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {session ? (
                  <Link
                    to={session.role === 'admin' ? '/admin' : '/blogs'}
                    className="inline-flex items-center justify-center bg-white text-indigo-700 px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                  >
                    Start Reading
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center bg-white text-indigo-700 px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                  >
                    Start Reading
                  </Link>
                )}
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-transparent text-white ring-1 ring-white/30 px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Right — decorative floating cards */}
            <div className="md:col-span-5 hidden md:flex justify-center relative">
              {/* Main card */}
              <div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-64 shadow-2xl ring-1 ring-white/20"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <div className="w-full h-3 bg-white/20 rounded-full mb-4" />
                <div className="w-3/4 h-3 bg-white/20 rounded-full mb-3" />
                <div className="w-1/2 h-3 bg-white/20 rounded-full mb-6" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                  <div className="w-4/6 h-2 bg-white/10 rounded-full" />
                </div>
              </div>

              {/* Offset smaller card */}
              <div
                className="absolute -bottom-6 -right-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-48 shadow-xl ring-1 ring-white/20"
                style={{ animation: 'float-delayed 3s ease-in-out 1s infinite' }}
              >
                <div className="w-full h-2 bg-white/20 rounded-full mb-3" />
                <div className="w-2/3 h-2 bg-white/20 rounded-full mb-4" />
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-white/10 rounded-full" />
                  <div className="w-4/5 h-1.5 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-text mb-12">
            Why WriteSpace?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-surface rounded-2xl p-8 ring-1 ring-border hover:shadow-lg transition-all duration-200 motion-reduce:transition-none">
              <div className="bg-indigo-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo-600"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-text mb-2">
                Write Freely
              </h3>
              <p className="text-text-muted leading-relaxed">
                A distraction-free editor that lets your words take centre
                stage. No clutter, no complexity — just you and the page.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface rounded-2xl p-8 ring-1 ring-border hover:shadow-lg transition-all duration-200 motion-reduce:transition-none">
              <div className="bg-violet-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-text mb-2">
                Private &amp; Local
              </h3>
              <p className="text-text-muted leading-relaxed">
                Everything stays on your device. No servers, no tracking, no
                data collection. Your writing belongs to you alone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface rounded-2xl p-8 ring-1 ring-border hover:shadow-lg transition-all duration-200 motion-reduce:transition-none">
              <div className="bg-pink-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-pink-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-text mb-2">
                Instant &amp; Fast
              </h3>
              <p className="text-text-muted leading-relaxed">
                No loading spinners, no API calls. Everything renders instantly
                from local storage — the fastest blog platform you'll ever use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Posts ── */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-text mb-2">
            Latest Posts
          </h2>
          <p className="text-text-muted mb-12">
            Fresh writing from the community
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-6 ring-1 ring-border animate-pulse"
                >
                  <div className="h-4 bg-surface-2 rounded-full w-3/4 mb-4" />
                  <div className="h-3 bg-surface-2 rounded-full w-full mb-2" />
                  <div className="h-3 bg-surface-2 rounded-full w-5/6 mb-6" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-2" />
                    <div className="h-3 bg-surface-2 rounded-full w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface ring-1 ring-border mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-text-muted"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>
              </div>
              <p className="text-text-muted italic text-lg">
                No posts yet — check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((p, i) => (
                <BlogCard key={p.id} post={p} session={null} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-surface-inverse text-text-inverse py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link
                to="/"
                className="font-display text-xl font-semibold text-white hover:text-white/80 transition-colors"
              >
                WriteSpace
              </Link>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                A simple, private blogging platform that lives entirely in your
                browser.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium text-white text-sm mb-3">Navigate</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    All Blogs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white text-sm mb-3">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/login"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white text-sm mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/60 text-sm">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-white/60 text-sm">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-8">
            <p className="text-sm text-white/60">
              &copy; {currentYear} WriteSpace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
