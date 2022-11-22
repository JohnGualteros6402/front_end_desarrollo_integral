import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Survey } from 'src/app/classes/survey';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import { ResponseService } from 'src/app/services/response.service';

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
  responses: any;
  adminLength: number = 0;
  clientLength: number = 0;

  usersLength: number;
  questionsLength: number;
  surveysLength: number;
  responsesLength: number;

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getQuestions();
    this.getSurveys();
    this.getResponses();
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

  private getResponses() {
    this.responseService.getListResponses().subscribe((data) => {
      this.responses = data;
      this.responsesLength = data.length;
      console.log('Hola este es el length' + this.responsesLength);
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
      info: {
        title: 'Reporte Información Eskrive',
        author: 'Eskrive',
      },
      content: [
        {
          text: 'REPORTE',
          style: 'tittle',
        },
        ' ',
        ' ',
        ' ',
        ' ',
        'Reporte generado por Eskrive, en donde se presenta la información recolectada.',
        {
          text: 'USUARIOS',
          style: 'subheader',
        },
        {
          text: `Número de usuarios: ${this.usersLength}\n\n`,
        },

        {
          text: 'TEMAS',
          style: 'subheader',
        },
        {
          text: `Número de temas: ${this.surveysLength}\n\n`,
        },

        {
          text: 'PREGUNTAS',
          style: 'subheader',
        },
        {
          text: `Número de preguntas: ${this.questionsLength}`,
        },

        {
          text: 'RESPUESTAS',
          style: 'subheader',
        },
        {
          text: `Número de respuestas: ${this.responsesLength}`,
          style: 'subheader',
        },
        {
          text: `Numero de respuestas que han sido respondidas por un usuario en el sistema. \n\n`,
        },

        {
          style: 'tableExample',
          table: {
            body: [
              [
                'Número de Usuarios',
                'Número de Temas',
                'Número de Preguntas',
                'Número de Respuestas',
              ],
              [
                `${this.usersLength / 100} %   `,
                `${this.questionsLength / 100} % `,
                `${this.surveysLength / 100} %`,
                `${this.responsesLength / 100} % `,
              ],
            ],
          },
        },
        '\n\n\nOBJETIVO',
        '- Conocer los diferentes puntos de vista de los ciudadanos.',
        '- Buscar un patron en las respuestas para tomar decisiones igualitarias para todos.',
        '- Integridad en las respuestas para que toda opinión llegue tal cual fue escrita.',
        {
          text: '\n\n\nPROCEDIMIENTOS \n 1. Planteamiento de preguntas estrategicas y con nececidades para la ciudadania. \n 2. Disponibilidad para que el usuario pueda dar su opinión sobre el tema de su preferencia.\n 3. Recolección de opiniones mediante formularios virtuales. \n 4. Generación de certificados para constatar la participación del ciudadano en el sistema. \n 5. La opinión tendra discreción para guardar el bienestar dle usuario.\n\n',
          styles: 'texto',
        },
        {
          text: ' En la máxima medida permitida por la ley aplicable, en ningún caso el [propietario de la página web] será responsable por daños indirectos, punitivos, incidentales, especiales, consecuentes o ejemplares, incluidos, entre otros, daños por pérdida de beneficios, buena voluntad, uso, datos. u otras pérdidas intangibles, que surjan de o estén relacionadas con el uso o la imposibilidad de utilizar el servicio.\n  ',
          style: 'texto',
        },
        ' \n\n',
        {
          text: 'SISTEMA DE INFORMACIÓN PARA LA PARTICIPACIÓN CIUDADANA.',
          style: 'style1',
        },
        { text: '@2022', style: 'style1' },
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
        style1: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          color: 'blue',
        },
      },
    };
    const pdf = pdfMake.createPdf(dd);
    pdf.open();
  }
}
