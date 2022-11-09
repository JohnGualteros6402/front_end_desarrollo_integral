import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { CitizenGuard } from './guards/citizen.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AdminGuardGuard],
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then((m) => m.DashboardAdminModule),
  },
  {
    path: 'dashboard',
    canActivateChild: [CitizenGuard],
    loadChildren: () => import('./dashboard-user/dashboard-user.module').then((m) => m.DashboardUserModule),
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'restablecerClave/:email', component: UpdatePasswordComponent},
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
