import { NavItem } from '../models/nav-item.model';

export const SIDEBAR_MENU: readonly NavItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
  },

  {
    label: 'Members',
    icon: 'groups',
    route: '/members',
  },

  {
    label: 'Plans',
    icon: 'workspace_premium',
    route: '/plans',
  },

  {
    label: 'Payments',
    icon: 'payments',
    route: '/payments',
  },

  {
    label: 'Attendance',
    icon: 'fact_check',
    route: '/attendance',
  },
// This code will display the trainer Module
 {
    label: 'Trainers',
    icon: 'fitness_center',
    route: '/trainers',
  },

  {
    label: 'ReportsNew',
    icon: 'assessment',
    route: '/reports',

    children: [
      {
        label: 'Revenue Report',
        icon: ' payments',
        route: '/reports/revenue',
      },

      {
        label: 'Membership Report',
        icon: 'groups',
        route: '/reports/membership',
      },
    ],
  },

  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings',
  },
];
