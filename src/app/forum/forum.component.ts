import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {

  constructor( private router: Router, private http: HttpClient, private questionService: QuestionService,  private route: ActivatedRoute) { }
  id: number;
  email: any;
  questions:Question[];
  question:any = null;
  numberofquestions:number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.validateIsAuthenticated();
    this.getQuestions();
    this.getQuestionById();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  validateIsAuthenticated(){
    if(localStorage.getItem('isAuthenticated') || localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
      return
    }
    return this.router.navigate(['login']);
  }
  getQuestionById(){
    this.id = this.route.snapshot.params['id'];
    this.questionService.getQuestionById(this.id).subscribe(data => {
      this.question = data;
    }, (error: any) => console.log(error));
  }
  private getQuestions(){
    this.questionService.getListQuestions().subscribe(data => {
      this.questions = data;
      this.numberofquestions= this.questions.length;
      this.dtTrigger.next(this.questions);
    })
  }
  getQuestionAndRedirect(id: number){
    this.router.navigate(['/forum', id]).then(res=>window.location.reload())
  }
}
