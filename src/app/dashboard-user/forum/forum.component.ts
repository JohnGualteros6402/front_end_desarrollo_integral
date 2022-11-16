import { ResponseService } from './../../services/response.service';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { User } from 'src/app/classes/user';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit, OnDestroy {
  response: Response = new Response();
  questions: Question[];
  filteredQuestions: Question[];
  searchText: string = '';
  numberofquestions: number;
  id: number;
  question: any = null;
  email: string;
  user: User;
  username: string;
  idUser: number;
  idQuestion: number;
  responses: any[];
  responsesDependOfId: any[];
  objectResponse = {
    response: '',
    dateresponse: '',
    status: true,
    question: {
      idquestion: 0,
    },
    user: {
      iduser: 0,
    },
  };

  colorQuestion: string | null;

  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
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
    this.getEmailSession();
    this.getResponses();
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

  getEmailSession() {
    this.email = localStorage.getItem('email') || '';
    this.getUserByEmail(this.email);
  }

  getUserByEmail(email: string) {
    this.userService.findInformationUsers(email).subscribe((data: User) => {
      this.username = data.name;
      this.idUser = data.iduser;
    });
  }

  saveResponse() {
    var date = new Date();
    var date_local =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-0' +
      (date.getDay() + 1);
    this.objectResponse.dateresponse = date_local;
    console.log(date.toDateString());
    this.objectResponse.question.idquestion = this.id;
    this.objectResponse.user.iduser = this.idUser;
    this.responseService.addResponse(this.objectResponse).subscribe(
      (data) => {
        console.log(this.objectResponse);
      },
      (err) => console.log(err)
    );
    Swal.fire({
      title: 'Estas seguro de responder a esta pregunta?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, Estoy Seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Respuesta Guardada!',
          `gracias ${this.username} por responder la pregunta ${this.id}`,
          'success'
        );
        window.location.reload();
      }
    });
  }

  getResponses(){
    this.responseService.getListResponses().subscribe((data) => {
      this.responses = data;
      this.getResponsesDependOfId(this.id);
    });
  }

  getResponsesDependOfId(id: number){
    this.responsesDependOfId = this.responses.filter((response) => response.question.idquestion == id);
    console.log(this.responsesDependOfId);
  }

  generateNumber(number: number) {
    return (Math.random()*number).toFixed(0);
  }
  
  // colorRGB(){
  //   var color = "("+this.generateNumber(255)+"," + this.generateNumber(255) + "," + this.generateNumber(255) +")";
  //   this.randomColor.push("rgb" + color);
  //   console.log(this.randomColor);
  //   return this.randomColor;
  // }

  colorRGB(){
    var color = "("+this.generateNumber(255)+"," + this.generateNumber(255) + "," + this.generateNumber(255) +")";
    return "rgb" + color;
  }
}
