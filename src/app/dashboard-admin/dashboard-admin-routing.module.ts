import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterThemeComponent } from './register-theme/register-theme.component';
import { ThemeComponent } from './theme/theme.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailsComponent},
  { path: 'themes', component: ThemeComponent},
  { path: 'registerTheme', component: RegisterThemeComponent},
  { path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
