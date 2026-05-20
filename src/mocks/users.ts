import type { User } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    email: 'alex@taskflow.io',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'admin',
    preferences: { theme: 'system', emailDigest: true },
  },
  {
    id: 'u2',
    name: 'Jordan Lee',
    email: 'jordan@taskflow.io',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    role: 'member',
    preferences: { theme: 'dark' },
  },
  {
    id: 'u3',
    name: 'Sam Patel',
    email: 'sam@taskflow.io',
    role: 'member',
  },
  {
    id: 'u4',
    name: 'Riley Chen',
    email: 'riley@taskflow.io',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
    role: 'viewer',
    preferences: { theme: 'light' },
  },
  {
    id: 'u5',
    name: 'Casey Brooks',
    email: 'casey@taskflow.io',
    role: 'member',
    preferences: { theme: 'light', emailDigest: false },
  },
];

export const DEMO_CREDENTIALS = {
  email: 'alex@taskflow.io',
  password: 'demo1234',
};
