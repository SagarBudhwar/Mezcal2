import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './template/layout/layout.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { PaComponent } from './views/pa/pa.component';

const routes: Routes = [
  { path:'pa', component:PaComponent,pathMatch: 'full'},
  {path: '', canActivate: [AuthGuard], component: LayoutComponent,
  children: [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'master', canActivate: [AuthGuard],
    loadChildren: () => import('./views/master/master.module').then(m => m.MasterModule)
    },
    { path: 'transaction', canActivate: [AuthGuard],
    loadChildren: () => import('./views/transaction/transaction.module').then(m => m.TransactionModule)
    },
    { path: 'reports', canActivate: [AuthGuard],
    loadChildren: () => import('./views/reports/reports.module').then(m => m.ReportsModule)
  },
  ]},
  { path: 'login', component: LoginComponent },
  //{path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
