import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, savePosts, getUsers } from '../utils/storage';
import { getSession } from '../utils/auth';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(getPosts());
    setUsers(getUsers());
    setSession(getSession());
    setLoading(false);
  }, []);

  const totalPosts = posts.length;
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalRegularUsers = users.filter((u) => u.role === 'user').length;

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const handleDeletePost = (postId) => {
    if (window.confirm('Delete this post?')) {
      const updatedPosts = posts.filter((p) => p.id !== postId);
      savePosts(updatedPosts);
      setPosts(updatedPosts);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-8">
          <div className="bg-surface-2 rounded-2xl h-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl ring-1 ring-border h-28"
              />
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl ring-1 ring-border h-20"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 rounded-2xl p-8 md:p-12 mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
          Welcome back, {session?.displayName || 'Admin'}
        </h1>
        <p className="text-white/80 mt-2 text-lg">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard value={totalPosts} label="Total Posts" color="indigo" />
        <StatCard value={totalUsers} label="Total Users" color="violet" />
        <StatCard value={totalAdmins} label="Total Admins" color="pink" />
        <StatCard value={totalRegularUsers} label="Regular Users" color="teal" />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Link
          to="/write"
          className="bg-accent text-accent-fg px-5 py-2.5 rounded-xl font-medium hover:bg-accent-hover transition-colors"
        >
          Write New Post
        </Link>
        <Link
          to="/users"
          className="bg-surface text-text ring-1 ring-border px-5 py-2.5 rounded-xl font-medium hover:bg-surface-2 transition-colors"
        >
          Manage Users
        </Link>
      </div>

      {/* Recent Posts */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-text mb-6">
          Recent Posts
        </h2>
        {recentPosts.length === 0 ? (
          <p className="text-text-muted">No posts yet.</p>
        ) : (
          <div>
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-surface rounded-xl ring-1 ring-border p-5 mb-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text truncate">
                      {post.title}
                    </p>
                    <p className="text-text-muted text-sm">
                      {post.authorName || 'Unknown'} &middot;{' '}
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center shrink-0">
                    <Link
                      to={`/edit/${post.id}`}
                      className="text-accent hover:underline text-sm font-medium mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-danger hover:underline text-sm font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
