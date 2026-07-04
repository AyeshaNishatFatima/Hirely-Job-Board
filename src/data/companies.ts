import type { Company } from '@/types';

// Companies use initials + a brand color instead of image files, so the
// board renders crisp logo marks with zero network requests.
export const companies: Company[] = [
  {
    id: 'nimbus',
    name: 'Nimbus Cloud',
    logoInitials: 'NC',
    logoColor: 'bg-signal-500',
    location: 'Austin, TX',
    industry: 'Cloud Infrastructure',
  },
  {
    id: 'orbitpay',
    name: 'OrbitPay',
    logoInitials: 'OP',
    logoColor: 'bg-emerald-500',
    location: 'New York, NY',
    industry: 'Fintech',
  },
  {
    id: 'lumen',
    name: 'Lumen Labs',
    logoInitials: 'LL',
    logoColor: 'bg-highlight',
    location: 'Remote',
    industry: 'AI Research',
  },
  {
    id: 'vertex',
    name: 'Vertex Health',
    logoInitials: 'VH',
    logoColor: 'bg-rose-500',
    location: 'Boston, MA',
    industry: 'Healthtech',
  },
  {
    id: 'crestline',
    name: 'Crestline Studio',
    logoInitials: 'CS',
    logoColor: 'bg-violet-500',
    location: 'Los Angeles, CA',
    industry: 'Design Agency',
  },
  {
    id: 'harbor',
    name: 'Harbor Logistics',
    logoInitials: 'HL',
    logoColor: 'bg-cyan-600',
    location: 'Seattle, WA',
    industry: 'Logistics',
  },
  {
    id: 'northstar',
    name: 'Northstar Analytics',
    logoInitials: 'NA',
    logoColor: 'bg-indigo-600',
    location: 'Chicago, IL',
    industry: 'Data & Analytics',
  },
  {
    id: 'fablewear',
    name: 'Fablewear',
    logoInitials: 'FW',
    logoColor: 'bg-pink-500',
    location: 'Remote',
    industry: 'E-commerce',
  },
  {
    id: 'pixelforge',
    name: 'PixelForge Games',
    logoInitials: 'PF',
    logoColor: 'bg-orange-500',
    location: 'Vancouver, CA',
    industry: 'Gaming',
  },
  {
    id: 'greenhive',
    name: 'GreenHive',
    logoInitials: 'GH',
    logoColor: 'bg-lime-600',
    location: 'Remote',
    industry: 'Climate Tech',
  },
  {
    id: 'quanta',
    name: 'Quanta Systems',
    logoInitials: 'QS',
    logoColor: 'bg-blue-700',
    location: 'San Francisco, CA',
    industry: 'Semiconductors',
  },
  {
    id: 'wavelength',
    name: 'Wavelength Media',
    logoInitials: 'WM',
    logoColor: 'bg-fuchsia-600',
    location: 'Remote',
    industry: 'Media & Entertainment',
  },
];

export const getCompany = (id: string): Company => {
  const company = companies.find((c) => c.id === id);
  if (!company) {
    throw new Error(`Unknown company id: ${id}`);
  }
  return company;
};
