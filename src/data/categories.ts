import type { Category } from '@/types';

export interface CategoryMeta {
  name: Category;
  icon: string; // lucide-react icon name, mapped in Filters.tsx
}

export const categories: CategoryMeta[] = [
  { name: 'Engineering', icon: 'Code2' },
  { name: 'Design', icon: 'Palette' },
  { name: 'Product', icon: 'Boxes' },
  { name: 'Marketing', icon: 'Megaphone' },
  { name: 'Sales', icon: 'Handshake' },
  { name: 'Customer Support', icon: 'Headset' },
  { name: 'Data', icon: 'BarChart3' },
  { name: 'Finance', icon: 'Landmark' },
  { name: 'HR & People', icon: 'Users' },
];
