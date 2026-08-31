import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/payments-list/payments-list.component'
      ).then(
        m => m.PaymentsListComponent
      )
  },

  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/payments-create/payments-create.component'
      ).then(
        m => m.PaymentsCreateComponent
      )
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import(
        './pages/payments-edit/payments-edit.component'
      ).then(
        m => m.PaymentEditComponent
      )
  },

  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/payments-details/payments-details.component'
      ).then(
        m => m.PaymentDetailsComponent
      )
  }

];