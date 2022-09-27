import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Survey } from 'src/app/classes/survey';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  multi: any[];
  view: [number, number] = [800, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  response: Survey[];
  users: User[];
  questions: Question[];
  adminLength: number = 0;
  clientLength: number = 0;

  constructor(
    private userService: UserService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  
  private getUsers() {
    this.userService.getListUsers().subscribe((data) => {
      this.users = data;
      this.showTotalLengthWithRole(this.users);
    });
  }
  showTotalLengthWithRole(users: User[]){
    users.map((user) => {
      if(user.role === 'ADMIN'){
        this.adminLength += 1;
      } else if(user.role === 'CITIZEN'){
        this.clientLength += 1;
      }
    });
    this.fillGraphPie(this.adminLength, this.clientLength);
  }

  fillGraphPie(totalAdminCount: number, totalClientCount: number) {
    this.multi = [
      {
        name: 'Admin',
        value: totalAdminCount,
        },
        {
          name: 'Clientes',
          value: totalClientCount,
        }
    ];;
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
