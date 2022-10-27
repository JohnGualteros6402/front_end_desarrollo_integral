import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { Question } from '../classes/question';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Variables
  users: User[];
  questions: Question[];
  filteredQuestions: Question[];
  searchText: string = '';
  numberofquestions: number;
  emailSession: string | null = null;
  id: number;
  question: any = null;
  modalRef: BsModalRef;

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  searchCoin() {
    this.filteredQuestions = this.questions.filter((question) =>
      question.statement.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.numberofquestions = this.filteredQuestions.length;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getEmailSession();
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
  getEmailSession() {
    this.emailSession = localStorage.getItem('email');
  }

  logout() {
    if (localStorage.getItem('isAuthenticated')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('rol');
      localStorage.removeItem('email');
      this.router.navigate(['home']);
    }
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
      .navigate(['/dashboard/question', id])
      .then((res) => window.location.reload());
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
