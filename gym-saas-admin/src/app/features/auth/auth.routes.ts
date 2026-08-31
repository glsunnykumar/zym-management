export const AUTH_ROUTES = [

  {
    path: 'login',
    loadComponent: () =>
      import(
        './pages/login/login.component'
      ).then(
        m =>
          m.LoginComponent
      )
  }

];