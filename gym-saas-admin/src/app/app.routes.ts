import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // LOGIN AREA
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  // APP AREA
  {
    path: '',
    component: MainLayoutComponent,


  canActivate: [
    authGuard
  ],


    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'members',
        loadChildren: () =>
          import('./features/members/members.route')
            .then(m => m.MEMBERS_ROUTES)
      },

      {
        path: 'plans',
        loadChildren: () =>
          import('./features/plans/plan.routes')
            .then(m => m.PLANS_ROUTES)
      },

      {
        path: 'payments',
        loadChildren: () =>
          import('./features/payments/payment.routes')
            .then(m => m.PAYMENT_ROUTES)
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import('./features/attendance/attendance.route')
            .then(m => m.ATTENDANCE_ROUTES)
      },

        {
        path: 'trainers',
        loadChildren: () =>
          import('./features/trainers/trainer.routes')
            .then(m => m.TRAINER_ROUTES)
      },


      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes')
            .then(m => m.REPORTS_ROUTES)
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes')
            .then(m => m.SETTINGS_ROUTES)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }

];