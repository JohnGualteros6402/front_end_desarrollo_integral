import { Component, OnInit } from '@angular/core';
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

    let fecha = new Date();
    let porcentaje: any = (this.responsesLength / this.usersLength).toFixed(2);
    var URLactual = window.location;
    var dd = {
      content: [
        {
          columns: [
            {
              image:
                'data:image/jpeg;base64,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',
              width: 150,
            },
            { text: ' ' },
            {
              text: `Fecha: ${
                fecha.getDate() +
                ' / ' +
                (fecha.getMonth() + 1) +
                ' / ' +
                fecha.getFullYear()
              }`,
              margin: [40, 25, 0, 0],
            },
          ],
        },
        {
          text: 'REPORTE',
          style: 'tittleHeader',
          margin: [0, 40, 0, 60],
        },
        {
          style: 'table',
          table: {
            widths: [200, 40],
            body: [
              [
                {
                  text: 'Número de Usuarios',
                  fillColor: '#314EB9',
                  style: 'textTable',
                },
                { text: `${this.usersLength}`, style: 'textTable' },
              ],
            ],
          },
        },
        {
          style: 'table',

          table: {
            widths: [200, 40],
            body: [
              [
                {
                  text: 'Número de Temas',
                  fillColor: '#314EB9',
                  style: 'textTable',
                },
                { text: `${this.surveysLength}`, style: 'textTable' },
              ],
            ],
          },
        },
        {
          style: 'table',
          table: {
            widths: [200, 40],
            body: [
              [
                {
                  text: 'Número de Preguntas',
                  fillColor: '#314EB9',
                  style: 'textTable',
                },
                { text: `${this.questionsLength}`, style: 'textTable' },
              ],
            ],
          },
        },
        {
          style: 'table',
          table: {
            widths: [200, 40],
            body: [
              [
                {
                  text: 'Número de Respuestas',
                  fillColor: '#314EB9',
                  style: 'textTable',
                },
                { text: `${this.responsesLength}`, style: 'textTable' },
              ],
            ],
          },
        },
        {
          text: 'ESKRIVE INFORMA',
          style: 'tittleSubheader',
          margin: [0, 20, 0, 20],
        },

        '',

        'Eskrive integra a la ciudadania con el objetivo de generar amplio interes y participación de todos los ciudadanos, en temas como lo es la educación, asegurandose de dar a conocer que tan capacitados estan las Intituciones Educativas Distritales para sus posibles mejoras, y de esta forma proporcionar un mejor futuro para el país. El medioambiente en donde se da la posibilidad de aportar ideas paraa mejorar el cuidado con la naturaleza al rededor. La jusitica social y la seguridad de los ciudadanos dos tema simportantes que van de la mano donde no hace mucho tiempo atras se ha evidenciado que no se toman las debidas medidas con transgresiones de la constitución en sus diferentes formas.\n\n',
        {
          text: `Con base en la información anterior se informa que un ${
            parseFloat(porcentaje) * 100
          }%
          de los usuarios ha partipado en las encuestas proporciadas para la ciudadania.`,
          style: 'textImportant',
          margin: [0, 0, 0, 10],
        },
        {
          text: '"Eskrive una plataforma que nos une a todos, escuchamos al ciudadano con la importancia que se merece"',
          style: ['quote', 'small'],
        },
      ],
      styles: {
        tittleHeader: {
          fontSize: 30,
          bold: true,
          alignment: 'center',
        },
        tittleSubheader: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          background: 'lightblue',
        },
        date: {
          alignment: 'right',
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        textTable: {
          fontSize: 15,
        },
        small: {
          fontSize: 12,
          alignment: 'center',
          bold: true,
        },
        textImportant: {
          color: '#314EB9',
          fontSize: 15,
          bold: true,
        },
      },
    };
    const pdf = pdfMake.createPdf(dd);
    pdf.open();
  }
}
