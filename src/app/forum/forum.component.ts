import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor( private router: Router, private http: HttpClient, private questionService: QuestionService) { }
  email: any;
  questions: Question = new Question();
  ngOnInit(): void {
    this.validateIsAuthenticated();
  }

  validateIsAuthenticated(){
    if(localStorage.getItem('isAuthenticated') || localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
      return
    }
    return this.router.navigate(['login']);
  }
}
