import {
  Code2,
  Palette,
  Boxes,
  Megaphone,
  Handshake,
  Headset,
  BarChart3,
  Landmark,
  Users,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';
import { categories } from '@/data/categories';
import type { Category } from '@/types';
import { cx } from '@/utils/format';

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Boxes,
  Megaphone,
  Handshake,
  Headset,
  BarChart3,
  Landmark,
  Users,
};

interface FiltersProps {
  active: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

export default function Filters({ active, onSelect }: FiltersProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <Chip label="All roles" isActive={active === 'All'} onClick={() => onSelect('All')} Icon={LayoutGrid} />
      {categories.map((c) => (
        <Chip
          key={c.name}
          label={c.name}
          isActive={active === c.name}
          onClick={() => onSelect(c.name)}
          Icon={ICON_MAP[c.icon]}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  isActive,
  onClick,
  Icon,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  Icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'border-signal-500 bg-signal-500 text-white'
          : 'border-ink/10 bg-white text-ink/70 hover:border-signal-300 hover:text-signal-600 dark:border-white/10 dark:bg-surface-dark dark:text-white/70 dark:hover:text-signal-300',
      )}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
