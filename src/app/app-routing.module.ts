import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)
      },
      {
        path:'backlog',
        loadComponent: () => import('./pages/backlog/backlog.component').then(m => m.BacklogComponent)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'backlog',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/backlog/backlog.component').then(m => m.BacklogComponent)
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      }
    ]
  },
  {
    path:'access-denied',
    loadComponent: () => import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
