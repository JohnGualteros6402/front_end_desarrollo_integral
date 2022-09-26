import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { UsersComponent } from './users/users.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ThemeComponent } from './theme/theme.component';
import { RegisterThemeComponent } from './register-theme/register-theme.component';


@NgModule({
  declarations: [
    UsersComponent,
    DashboardAdminComponent,
    UserDetailsComponent,
    ThemeComponent,
    RegisterThemeComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsersComponent,
  ]
})
export class DashboardAdminModule { }
