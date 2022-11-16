import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Survey } from 'src/app/classes/survey';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  multi: any[];
  view: [number, number] = [700, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  response: Survey[];
  users: User[];
  questions: Question[];
  surveys: Survey[];
  adminLength: number = 0;
  clientLength: number = 0;

  usersLength: number;
  questionsLength: number;
  surveysLength: number;

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getQuestions();
    this.getSurveys();
  }

  private getUsers() {
    this.userService.getListUsers().subscribe((data) => {
      this.users = data;
      this.usersLength = data.length;
      this.showTotalLengthWithRole(this.users);
    });
  }
  private getQuestions() {
    this.questionService.getListQuestions().subscribe((data) => {
      this.questions = data;
      this.questionsLength = data.length;
    });
  }

  private getSurveys() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.surveys = data;
      this.surveysLength = data.length;
    });
  }

  reloadGrahps() {
    window.location.reload();
  }
  showTotalLengthWithRole(users: User[]) {
    users.map((user) => {
      if (user.role === 'ADMIN') {
        this.adminLength += 1;
      } else if (user.role === 'CITIZEN') {
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
      },
    ];
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

  createReportPDF() {
    const pdfMake = require('pdfmake');
    const pdfFonts = require('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    var dd = {
      content: [
        {
          text: 'REPORTE',
          style: 'tittle',
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
        {
          text: 'Subheader 1 - using subheader style',
          style: 'subheader',
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                'Número de Usuarios',
                'Número de preguntas',
                'Número de respuestas',
              ],
              [
                `${this.usersLength}`,
                `${this.questionsLength}`,
                `${this.surveysLength}`,
              ],
            ],
          },
        },
        '',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
        {
          text: 'Subheader 2 - using subheader style',
          style: 'subheader',
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
        {
          text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
          style: ['quote', 'small'],
        },
      ],
      styles: {
        tittle: {
          fontSize: 30,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };
    const pdf = pdfMake.createPdf(dd);
    pdf.open();
  }
}
