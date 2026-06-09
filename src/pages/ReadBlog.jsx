import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosts, savePosts } from '../utils/storage';
import { getSession } from '../utils/auth';
import { getAvatar } from '../components/Avatar';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export default function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const session = getSession();

  useEffect(() => {
    const posts = getPosts();
    const found = posts.find((p) => p.id === id);
    setPost(found || null);
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (!post) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) return;

    if (session.role === 'admin' || post.authorId === session.userId) {
      const posts = getPosts();
      const filtered = posts.filter((p) => p.id !== post.id);
      savePosts(filtered);
      navigate('/blogs');
    }
  };

  const canEdit =
    post && (session.role === 'admin' || post.authorId === session.userId);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-surface-2 rounded" />
          <div className="h-12 w-3/4 bg-surface-2 rounded-xl" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-surface-2 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-surface-2 rounded" />
              <div className="h-3 w-32 bg-surface-2 rounded" />
            </div>
          </div>
          <div className="border-t border-border my-6" />
          <div className="space-y-3">
            <div className="h-5 bg-surface-2 rounded w-full" />
            <div className="h-5 bg-surface-2 rounded w-5/6" />
            <div className="h-5 bg-surface-2 rounded w-4/6" />
            <div className="h-5 bg-surface-2 rounded w-full" />
            <div className="h-5 bg-surface-2 rounded w-3/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-text mb-2">
          Post not found
        </h1>
        <p className="text-text-muted mb-6">
          The post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center justify-center bg-accent text-accent-fg px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Back to All Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <Link
        to="/blogs"
        className="text-text-muted hover:text-text text-sm transition-colors mb-8 inline-block"
      >
        &larr; Back to All Posts
      </Link>

      {canEdit && (
        <div className="flex items-center gap-3 mb-6">
          <Link
            to={`/edit/${post.id}`}
            className="bg-white text-accent ring-1 ring-accent/30 px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent-light transition-colors"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-danger-light text-danger ring-1 ring-danger/30 px-4 py-2 rounded-xl text-sm font-medium hover:bg-danger/10 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}

      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        {getAvatar(post.authorName === 'Admin' ? 'admin' : 'user')}
        <div>
          <p className="font-medium text-text">{post.authorName}</p>
          <p className="text-text-muted text-sm">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      <hr className="border-t border-border my-6" />

      <div className="text-text leading-relaxed whitespace-pre-wrap text-lg max-w-[65ch]">
        {post.content}
      </div>
    </div>
  );
}
