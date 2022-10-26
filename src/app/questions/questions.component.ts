import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Question } from '../classes/question';
import { Survey } from '../classes/survey';
import { User } from '../classes/user';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  buttonMode: HTMLButtonElement;
  questions: Question[];
  numberofquestions: number;
  surveysInformation: Survey[];
  iconMoon: string =
    '<img src="../assets/icons-template/icons/moon.svg" alt="moon icon"/>';
  iconSun: string =
    '<img src="../assets/icons-template/icons/brightness-high.svg" alt="sun icon"/>';
  isDark: boolean = false;
  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private router: Router,
    private http: HttpClient
  ) {
    this.getQuestions();
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getSurvey();
  }
  // Button Events
  toggleDarkMode() {
    document.body.classList.toggle('darkmode');
    if (document.body.classList.contains('darkmode')) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }

  private getSurvey() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.surveysInformation = data;
    });
  }

  private getQuestions() {
    this.questionService.getListQuestions().subscribe((data) => {
      this.questions = data;
      this.numberofquestions = this.questions.length;
      console.log(this.numberofquestions);
    });
  }
  logout() {
    if (localStorage.getItem('isAuthenticated')) {
      localStorage.removeItem('isAuthenticated');
      this.router.navigate(['home']);
    }
  }

  // Function for open alert for show confirm button if it's clicked then should redirect to view, create new theme
  openAlertCreateThemeConfirm() {
    Swal.fire({
      title: '<strong>Crear Tema</strong>',
      text: `si la respuesta es si da Click en el boton`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#2ACFB9',
      confirmButtonText: 'Crear Nuevo Tema',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['registerTheme']);
      }
    });
  }
}
