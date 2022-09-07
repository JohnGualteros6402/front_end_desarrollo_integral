import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../classes/survey';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-register-theme',
  templateUrl: './register-theme.component.html',
  styleUrls: ['./register-theme.component.css']
})
export class RegisterThemeComponent implements OnInit {

  survey : Survey = new Survey;

  constructor(private surveyService: SurveyService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveSurvey(){
    this.surveyService.addSurvey(this.survey).subscribe(data=>{
      console.log(data);
      this.redirectDashboard();
    }, err => console.log(err));
  }
  redirectDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onSubmit(){
    this.saveSurvey();
  }

}
