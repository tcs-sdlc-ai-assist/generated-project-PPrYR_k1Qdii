import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAvatar } from './Avatar';

const ACCENT_BORDERS = [
  'border-t-4 border-indigo-500',
  'border-t-4 border-violet-500',
  'border-t-4 border-pink-500',
  'border-t-4 border-teal-500',
];

/**
 * BlogCard — displays a post preview card with title, excerpt, author, and date.
 *
 * When `session` is provided the entire card links to `/blog/:id`.
 * When `session` is null (guest on landing page) clicking navigates to `/login`.
 *
 * An edit pencil icon appears top-right when the current user is the author
 * or an admin.
 */
function BlogCard({ post, session, index }) {
  const navigate = useNavigate();

  const excerpt =
    post.content.length > 120
      ? post.content.substring(0, 120) + '...'
      : post.content;

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const showEdit =
    session &&
    (session.role === 'admin' || post.authorId === session.userId);

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${post.id}`);
  };

  const cardContent = (
    <>
      {/* Accent top border */}
      <div className={ACCENT_BORDERS[index % 4]} />

      <div className="relative p-5">
        {/* Edit button — absolutely positioned top-right */}
        {showEdit && (
          <button
            onClick={handleEditClick}
            className="absolute top-3 right-3 text-text-muted hover:text-accent transition-colors p-1.5 rounded-lg hover:bg-surface-2 z-10"
            aria-label={`Edit post: ${post.title}`}
            title="Edit post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
        )}

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-text mb-2 pr-8">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {excerpt}
        </p>

        {/* Bottom row: author + date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {getAvatar(post.author?.role || 'user')}
            <span className="text-sm text-text-muted truncate">
              {post.author?.displayName || 'Unknown'}
            </span>
          </div>
          <span className="text-sm text-text-muted tabular-nums flex-shrink-0 ml-3">
            {formattedDate}
          </span>
        </div>
      </div>
    </>
  );

  const cardClasses =
    'block bg-surface rounded-2xl ring-1 ring-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none';

  if (session) {
    return (
      <Link to={`/blog/${post.id}`} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      onClick={() => navigate('/login')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate('/login');
        }
      }}
      className={cardClasses + ' cursor-pointer'}
      role="link"
      tabIndex={0}
    >
      {cardContent}
    </div>
  );
}

BlogCard.propTypes = {
  /** The post object to display */
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    author: PropTypes.shape({
      displayName: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  /** Current session object, or null for guests */
  session: PropTypes.object,
  /** Card index (used to cycle accent border colors) */
  index: PropTypes.number.isRequired,
};

export default BlogCard;
