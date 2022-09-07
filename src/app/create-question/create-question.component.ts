import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  question : Question = new Question;

  constructor(private questionService: QuestionService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveQuestion(){
    this.questionService.addQuestion(this.question).subscribe(data=>{
      console.log(data);
      this.redirectDashboard();
    }, err => console.log(err));
  }
  redirectDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onSubmit(){
    this.saveQuestion();
  }

}
