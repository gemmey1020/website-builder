// Auth Imports
import { IRoute } from '@/types/types';
import {
  HiOutlineHome,
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineCog8Tooth,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';

export const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    path: '/dashboard/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    details: 'Overview of user statistics, site analytics, and performance metrics.',
    link: 'http://127.0.0.1:8000/dashboard/main'
  },
  {
    name: 'AI Chat',
    path: '/dashboard/ai-chat',
    icon: <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    details: 'Chat with AI-powered assistants to generate responses and automate tasks.',
    link: 'http://127.0.0.1:8000/dashboard/ai-chat'
  },
  {
    name: 'Profile Settings',
    path: '/dashboard/settings',
    icon: <HiOutlineCog8Tooth className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    details: 'Manage user profile details, change password, and update settings.',
    link: 'http://127.0.0.1:8000/dashboard/settings'
  },
  {
    name: 'AI Generator',
    path: '/dashboard/ai-generator',
    icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Generate AI-driven content automatically for various needs.',
    link: 'http://127.0.0.1:8000/dashboard/ai-generator'
  },
  {
    name: 'AI Assistant',
    path: '/dashboard/ai-assistant',
    icon: <HiOutlineUser className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Personal AI assistant to manage tasks and provide recommendations.',
    link: 'http://127.0.0.1:8000/dashboard/ai-assistant'
  },
  {
    name: 'Users List',
    path: '/dashboard/users',
    icon: <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'View and manage system users.',
    link: 'http://127.0.0.1:8000/dashboard/users'
  },
  {
    name: 'Subscription',
    path: '/dashboard/subscription',
    icon: <HiOutlineCreditCard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Manage subscription plans and billing details.',
    link: 'http://127.0.0.1:8000/dashboard/subscription'
  },
  {
    name: 'Landing Page',
    path: '/home',
    icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Public landing page displaying features and offerings.',
    link: 'http://127.0.0.1:8000/home'
  },
  {
    name: 'websites',
    path: '#',
    icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Public landing page displaying features and offerings.',
    link: 'http://127.0.0.1:8000/home'
  },
  {
    name: 'templets',
    path: '/dashboard/templates',
    icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'Public landing page displaying features and offerings.',
    link: 'http://127.0.0.1:8000/home'
  },
  {
    name: 'Pricing Page',
    path: '/pricing',
    icon: <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true,
    details: 'View pricing plans and features available.',
    link: 'http://127.0.0.1:8000/pricing'
  }
];
// Compare this snippet from front_admin/components/dashboard/settings/index.tsx:
