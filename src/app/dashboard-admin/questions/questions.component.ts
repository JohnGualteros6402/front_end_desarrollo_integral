import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  questions: Question[];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<void>();

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json',
      },
    };
    this.getQuestions();
  }

  private getQuestions() {
    this.questionService.getListQuestions().subscribe((data) => {
      this.questions = data;
      this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  enableQuestion(id: number, question: Question) {
    Swal.fire({
      title: 'Estas seguro de activar la pregunta?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, Activalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.changeStatusQuestion(id, question).subscribe((data) => {
          this.getQuestions();
          Swal.fire(
            'Activado!',
            'la pregunta ah sido activada satsifactoriamente.',
            'success'
          );
        });
      }
    });
  }
  disableQuestion(id: number, question: Question) {
    Swal.fire({
      title: 'Estas seguro de inactivar la pregunta?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, inactivalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.changeStatusQuestion(id, question).subscribe((data) => {
          this.getQuestions();
          Swal.fire(
            'Inactivado!',
            'la pregunta ah sido inactivada satsifactoriamente.',
            'success'
          );
        });
      }
    });
  }
  openAlertConfirmation() {
    Swal.fire({
      title: 'Estas seguro que quieres crear una Pregunta?',
      text: 'Serás redirigido al formulario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, Estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire(
            'Redireccionando!',
            'podrás crear la pregunta en un momento.',
            'success'
          ).then(res=>this.router.navigate(['/admin/registerQuestion']))
      }
    });
  }
}
