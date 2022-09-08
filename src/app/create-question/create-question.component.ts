import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../classes/question';
import { Survey } from '../classes/survey';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  question : Question = new Question;
  surveys: Survey[];
  surveyObject: Survey = new Survey;

  constructor(private questionService: QuestionService, private surveyService: SurveyService, private router: Router, private http: HttpClient) {
    this.getSurvay();
   }

  ngOnInit(): void {

    this.getSurvay();

    this.validateIsAuthenticated();
  }
  validateIsAuthenticated(){
    if(localStorage.getItem('isAuthenticated')){
      return
    }
    return this.router.navigate(['login']);

  }
  saveQuestion(){
    this.questionService.addQuestion(this.question).subscribe(data=>{
      this.redirectDashboard();
    }, err => console.log(err));
  }
  redirectDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onSubmit(){
    this.saveQuestion();
    // console.log(this.question);
  }

  getSurvay() {
    this.surveyService.getListSurveys().subscribe(data => {
      this.surveys = data;
      console.log(this.surveys);
    });
  }

  

}
