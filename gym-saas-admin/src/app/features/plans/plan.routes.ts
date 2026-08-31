import { Routes } from '@angular/router';

export const PLANS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/plans-list/plans-list.component'
      ).then(
        m => m.PlansListComponent
      )
  },

  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/plan-create/plan-create.component'
      ).then(
        m => m.PlanCreateComponent
      )
  },

  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/plan-details/plan-details.component'
      ).then(
        m => m.PlanDetailsComponent
      )
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import(
        './pages/plan-edit/plan-edit.component'
      ).then(
        m => m.PlanEditComponent
      )
  }

];