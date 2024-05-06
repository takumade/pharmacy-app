import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'medicine', title: 'Medicine', href: paths.dashboard.medicine, icon: 'pill' },
  { key: 'prescriptions', title: 'Prescriptions', href: paths.dashboard.medicine, icon: 'scroll' },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'orders', title: 'Orders', href: paths.dashboard.medicine, icon: 'shopping-bag' },
  { key: 'transactions', title: 'Transactions', href: paths.dashboard.medicine, icon: 'money' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
