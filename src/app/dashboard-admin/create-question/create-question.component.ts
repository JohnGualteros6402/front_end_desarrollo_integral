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
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  question: Question = new Question();
  surveys: Survey[];
  idSurvey: number;
  surveyObject: Survey = new Survey();
  loading: boolean = false;

  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private router: Router,
    private http: HttpClient
  ) {
    this.getSurvay();
    // console.log(this.surveyObject)
  }

  ngOnInit(): void {
    this.getSurvay();
  }

  saveQuestion() {
    this.loading = true;
    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
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
      this.surveyObject.idsurvey = data['idsurvey'];
      this.surveyObject.theme = data['theme'];
      this.surveyObject.status = data['status'];
    });
    this.question.survey = this.surveyObject;
    this.saveQuestion();
  }

  getSurvay() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.surveys = data;
      // console.log(this.surveys);
    });
  }

}
