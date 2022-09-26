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
import { QuestionsComponent } from './questions/questions.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    UsersComponent,
    DashboardAdminComponent,
    UserDetailsComponent,
    ThemeComponent,
    RegisterThemeComponent,
    QuestionsComponent,
    CreateQuestionComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  exports: [
    UsersComponent,
  ]
})
export class DashboardAdminModule { }
