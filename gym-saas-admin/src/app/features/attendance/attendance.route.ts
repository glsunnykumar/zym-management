import {
  Routes
} from '@angular/router';

export const ATTENDANCE_ROUTES:
Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/attendance-list/attendance-list.component'
      ).then(
        m => m.AttendanceListComponent
      )
  },

  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/attendance-create/attendance-create.component'
      ).then(
        m => m.AttendanceCreateComponent
      )
  },

  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/attendance-details/attendance-details.component'
      ).then(
        m => m.AttendanceDetailsComponent
      )
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import(
        './pages/attendance-edit/attendance-edit.component'
      ).then(
        m => m.AttendanceEditComponent
      )
  }

]; 