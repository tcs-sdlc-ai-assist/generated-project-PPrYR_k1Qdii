import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/storage';
import { getSession } from '../utils/auth';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = getSession();

  useEffect(() => {
    const allPosts = getPosts();
    const sorted = [...allPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sorted);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 bg-surface-2 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-surface-2 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-text">
          All Posts
        </h1>
        <Link
          to="/write"
          className="bg-accent text-accent-fg px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Write New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4" aria-hidden="true">
            📝
          </div>
          <h2 className="font-display text-2xl font-semibold text-text mb-2">
            No blogs yet.
          </h2>
          <p className="text-text-muted mb-6">
            Be the first to write one!
          </p>
          <Link
            to="/write"
            className="inline-flex items-center justify-center bg-accent text-accent-fg px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} session={session} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
