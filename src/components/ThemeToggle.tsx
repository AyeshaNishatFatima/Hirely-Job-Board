import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-signal-400 hover:text-signal-600 dark:border-white/10 dark:bg-surface-dark dark:text-white dark:hover:text-signal-300"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
