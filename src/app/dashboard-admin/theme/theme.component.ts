import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Survey } from 'src/app/classes/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  surveys: Survey[];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<void>();

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json',
      },
    };
    this.getSurveys();
  }

  private getSurveys() {
    this.surveyService.getListSurveys().subscribe((data) => {
      this.surveys = data;
      this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  enableSurvey(id: number, survey: Survey) {
    Swal.fire({
      title: 'Estas seguro de activar el tema?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, Activalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService.changeStatusSurvey(id, survey).subscribe((data) => {
          this.getSurveys();
          Swal.fire(
            'Activado!',
            'el tema ah sido activado satsifactoriamente.',
            'success'
          );
        });
      }
    });
  }
  disableSurvey(id: number, survey: Survey) {
    Swal.fire({
      title: 'Estas seguro de inactivar el tema?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, inactivalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService.changeStatusSurvey(id, survey).subscribe((data) => {
          this.getSurveys();
          Swal.fire(
            'Inactivado!',
            'el tema ah sido inactivado satsifactoriamente.',
            'success'
          );
        });
      }
    });
  }
  openAlertConfirmation() {
    Swal.fire({
      title: 'Estas seguro que quieres crear un tema?',
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
            'podrás crear el tema en un momento.',
            'success'
          ).then(res=>this.router.navigate(['/admin/registerTheme']))
      }
    });
  }
}
