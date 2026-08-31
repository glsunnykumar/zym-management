import { Routes } from '@angular/router';

export const MEMBERS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/members-list/members-list.component'
      ).then(
        m => m.MembersListComponent
      )
  },

  

  {
    
    path: 'create',
    loadComponent: () =>
      import(
        
        './pages/member-create/member-create.component'
      ).then(
        m => m.MemberCreateComponent
      )
  },

  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/member-details/member-details.component'
      ).then(
        m => m.MemberDetailsComponent
      )
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import(
        './pages/member-edit/member-edit.component'
      ).then(
        m => m.MemberEditComponent
      )
  }
];