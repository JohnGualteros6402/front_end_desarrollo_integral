import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { DashboardUserComponent } from './dashboard-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { ForumComponent } from './forum/forum.component';


@NgModule({
  declarations: [
    DashboardUserComponent,
    UserComponent,
    ForumComponent
  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardUserModule { }
