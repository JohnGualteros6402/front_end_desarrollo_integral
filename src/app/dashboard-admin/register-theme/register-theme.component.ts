import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from 'src/app/classes/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-register-theme',
  templateUrl: './register-theme.component.html',
  styleUrls: ['./register-theme.component.css']
})
export class RegisterThemeComponent implements OnInit {

  survey : Survey = new Survey;
  loading: boolean = false;
  constructor(private surveyService: SurveyService, private router: Router) { }

  ngOnInit(): void {
  }
  saveSurvey(){
    this.loading = true;
    this.surveyService.addSurvey(this.survey).subscribe(data=>{
      this.loading = false;
      this.redirectListThemes();
    }, err => console.log(err));
  }
  onSubmit(){
    this.saveSurvey();
  }
  redirectListThemes(){
    this.router.navigate(['/admin/themes']);
  }

}
