import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Survey } from 'src/app/classes/survey';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  multi: any[] = [];
  view: [number, number] = [700, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  response: Survey[];
  users: User[];

  constructor(
    private surveyService: SurveyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getSurveys();
    this.getUsers();
    console.log(this.multi)
    // console.log(this.users.length);
    console.log(this.users);
  }

  private getSurveys() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.response = data;
    });
  }
  private getUsers() {
    this.userService.getListUsers().subscribe((data) => {
      this.users = data;
      // this.users.map(user=>{
      //   this.multi.push({
      //     name: "admin",
      //     value: 20
      //   })
      // })
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
