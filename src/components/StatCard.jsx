import PropTypes from 'prop-types';

const COLOR_MAP = {
  indigo: 'bg-indigo-100 text-indigo-600',
  violet: 'bg-violet-100 text-violet-600',
  pink: 'bg-pink-100 text-pink-600',
  teal: 'bg-teal-100 text-teal-600',
};

/**
 * Dashboard stat tile displaying a single metric.
 *
 * @param {{ value: number, label: string, color?: 'indigo' | 'violet' | 'pink' | 'teal' }} props
 */
export default function StatCard({ value, label, color = 'indigo' }) {
  const iconColorClass = COLOR_MAP[color] || COLOR_MAP.indigo;

  return (
    <div className="bg-surface rounded-2xl p-6 ring-1 ring-border">
      {/* Colored icon placeholder */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColorClass}`}
        aria-hidden="true"
      />

      {/* Value */}
      <p className="text-3xl font-bold text-text tabular-nums mt-4">
        {value}
      </p>

      {/* Label */}
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  );
}

StatCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['indigo', 'violet', 'pink', 'teal']),
};
