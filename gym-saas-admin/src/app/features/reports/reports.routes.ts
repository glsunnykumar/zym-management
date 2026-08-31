import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/revenue-report/revenue-report.component'
      ).then(
        m => m.RevenueReportComponent
      )
  } ,

  {
  path: 'membership',
  loadComponent: () =>
    import(
      './pages/membership-report/membership-report.component'
    ).then(
      m =>
        m.MembershipReportComponent
    )
},

  {
    path: 'revenue',
    loadComponent: () =>
      import(
        './pages/revenue-report/revenue-report.component'
      ).then(
        m => m.RevenueReportComponent
      )
  }


];