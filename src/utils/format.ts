/**
 * Formats a salary range into a compact, readable string, e.g. "$130K – $165K"
 * or "$40 – $55/hr" for hourly currencies like "USD/hr".
 */
export function formatSalary(min: number, max: number, currency: string): string {
  const isHourly = currency.includes('/hr');
  const symbol = currency.replace('/hr', '') === 'CAD' ? 'CA$' : '$';

  if (isHourly) {
    return `${symbol}${min} – ${symbol}${max}/hr`;
  }

  const format = (n: number) => `${symbol}${Math.round(n / 1000)}K`;
  return `${format(min)} – ${format(max)}`;
}

/**
 * Converts an ISO date string into a short relative label, e.g. "Today",
 * "Yesterday", "3d ago", or "2w ago".
 */
export function formatRelativeDate(iso: string): string {
  const posted = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  const weeks = Math.floor(diffDays / 7);
  return `${weeks}w ago`;
}

/** Joins class names conditionally, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
