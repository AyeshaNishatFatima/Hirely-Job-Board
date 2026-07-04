// Core domain types shared across the app

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';

export type Category =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Sales'
  | 'Customer Support'
  | 'Data'
  | 'Finance'
  | 'HR & People';

export interface Company {
  id: string;
  name: string;
  logoInitials: string;
  logoColor: string; // Tailwind class for background color
  location: string;
  industry: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  category: Category;
  type: JobType;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  postedAt: string; // ISO date string
  featured: boolean;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface JobFilters {
  query: string;
  location: string;
  category: Category | 'All';
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}
