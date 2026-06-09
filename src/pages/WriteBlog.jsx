import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosts, savePosts } from '../utils/storage';
import { getSession } from '../utils/auth';

export default function WriteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  const session = getSession();

  useEffect(() => {
    if (!isEdit) return;

    const posts = getPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      navigate('/blogs');
      return;
    }

    if (session.role === 'user' && post.authorId !== session.userId) {
      navigate('/blogs');
      return;
    }

    setTitle(post.title);
    setContent(post.content);
    setLoading(false);
  }, [id, isEdit, navigate, session.role, session.userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      setError('Both title and content are required.');
      return;
    }

    setError('');

    if (isEdit) {
      const posts = getPosts();
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) {
        navigate('/blogs');
        return;
      }
      posts[index] = {
        ...posts[index],
        title: title.trim(),
        content: content.trim(),
      };
      savePosts(posts);
      navigate(`/blog/${id}`);
    } else {
      const newPost = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        authorId: session.userId,
        authorName: session.displayName,
      };
      const posts = getPosts();
      posts.push(newPost);
      savePosts(posts);
      navigate(`/blog/${newPost.id}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-9 w-48 bg-surface-2 rounded-xl" />
          <div className="space-y-2">
            <div className="h-5 w-12 bg-surface-2 rounded" />
            <div className="h-12 bg-surface-2 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-16 bg-surface-2 rounded" />
            <div className="h-64 bg-surface-2 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="font-display text-3xl font-semibold text-text mb-8">
        {isEdit ? 'Edit Post' : 'Write New Post'}
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div
            className="text-danger text-sm bg-danger-light rounded-lg px-3 py-2 mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="post-title"
            className="text-sm font-medium text-text mb-1.5 block"
          >
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title..."
            className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface text-lg"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="post-content"
            className="text-sm font-medium text-text mb-1.5 block"
          >
            Content
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story..."
            rows={10}
            className="w-full px-4 py-3 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface min-h-[256px] resize-y"
          />
          <p className="text-text-muted text-sm mt-1">
            {content.length} character{content.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            className="bg-accent text-accent-fg px-6 py-2.5 rounded-xl font-medium hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {isEdit ? 'Update' : 'Publish'}
          </button>
          <Link
            to={isEdit ? `/blog/${id}` : '/blogs'}
            className="text-text-muted px-6 py-2.5 rounded-xl font-medium hover:bg-surface-2 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
