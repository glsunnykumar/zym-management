import { Routes } from '@angular/router';

export const TRAINER_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/trainer-list/trainer-list.component')
        .then(m => m.TrainerListComponent)
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./pages/trainer-create/trainer-create.component')
        .then(m => m.TrainerCreateComponent)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/detail/detail.component')
        .then(m => m.DetailComponent)
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/trainer-edit/trainer-edit.component')
        .then(m => m.TrainerEditComponent)
  }

];