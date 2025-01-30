// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './demo/pages/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./demo/authentication/forgot-password/forgot-password.component')
  },
  {
    path: 'verify-otp',
    loadComponent: () => import('./demo/authentication/verify-otp/verify-otp.component')
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./demo/authentication/reset-password/reset-password.component')
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
        path: '',
        loadChildren: () =>
          import('./demo/pages/main.module').then((m) => m.MainModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
