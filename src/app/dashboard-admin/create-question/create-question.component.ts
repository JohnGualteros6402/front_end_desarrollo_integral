import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { Survey } from 'src/app/classes/survey';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  question: Question = new Question();
  surveys: Survey[];
  idSurvey: number;
  surveyObject: Survey = new Survey();
  objectSurvey = {
    statement: '',
    openingdate: '',
    closingdate: '',
    state: true,
    survey: {
      idsurvey: 0,
      theme: '',
      status: true,
    },
  };
  loading: boolean = false;

  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private router: Router,
    private http: HttpClient
  ) {
    this.getSurvay();
    Survey;
    // console.log(this.surveyObject)
  }

  ngOnInit(): void {
    this.getSurvay();
  }

  saveQuestion(idSurvey: any, theme: string, status: boolean) {
    this.loading = true;
    this.objectSurvey.survey.idsurvey = idSurvey;
    this.objectSurvey.survey.theme = theme;
    this.objectSurvey.survey.status = status;
    this.questionService.addQuestion(this.objectSurvey).subscribe(
      (data) => {
        console.log(this.objectSurvey);
        this.loading = false;
        this.redirectListQuestions();
      },
      (err) => console.log(err)
    );
  }
  redirectListQuestions() {
    this.router.navigate(['/admin/questions']);
  }
  onSubmit() {
    this.surveyService.getSurveyById(this.idSurvey).subscribe((data) => {
      this.saveQuestion(data['idsurvey'], data['theme'], data['status']);
    });
  }

  getSurvay() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.surveys = data;
      // console.log(this.surveys);
    });
  }
}
