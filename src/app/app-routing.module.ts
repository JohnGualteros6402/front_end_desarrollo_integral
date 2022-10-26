import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminModule } from './dashboard-admin/dashboard-admin.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterThemeComponent } from './register-theme/register-theme.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { CitizenGuard } from './guards/citizen.guard';

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
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
