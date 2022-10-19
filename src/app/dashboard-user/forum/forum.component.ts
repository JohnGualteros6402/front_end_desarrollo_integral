import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { User } from 'src/app/classes/user';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {

  questions: Question[];
  filteredQuestions: Question[];
  searchText: string = '';
  numberofquestions: number;
  id: number;
  question: any = null;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  searchQuestion() {
    this.filteredQuestions = this.questions.filter((question) =>
      question.statement.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.numberofquestions = this.filteredQuestions.length;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getQuestionById();
  }
  ngOnDestroy(): void {}
  private getQuestions() {
    this.questionService.getListQuestions().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data;
      this.numberofquestions = this.filteredQuestions.length;
    });
  }
  getQuestionById() {
    this.id = this.route.snapshot.params['id'];
    this.questionService.getQuestionById(this.id).subscribe(
      (data) => {
        this.question = data;
      },
      (error: any) => console.log(error)
    );
  }
  getQuestionAndRedirect(id: number) {
    this.router
      .navigate(['/dashboard/forum/question', id])
      .then((res) => window.location.reload());
  }
}
