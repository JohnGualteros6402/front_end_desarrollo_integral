import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'
import { QuestionService } from '../services/question.service';
import { Question } from '../classes/question';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Variables
  tableUsersHeaders: string[] = [
    'número de documento',
    'nombres y apellidos',
    'dirección',
    'correo electrónico',
    'número de teléfono - número de fijo',
    'fecha de nacimineto',
    'municipio',
    'estrato',
    'nivel académico',
    'sexo',
    'afiliación regimen',
    'condición de discapacidad',
    'etnia',
    'acceso tecnológico',
    'acciones'
  ];
  buttonMode: HTMLButtonElement;
  users:User[];
  iconMoon: string =
    '<img src="../assets/icons-template/icons/moon.svg" alt="moon icon"/>';
  iconSun: string =
    '<img src="../assets/icons-template/icons/brightness-high.svg" alt="sun icon"/>';
  isDark: boolean = false;
  questions:Question[];
  numberofquestions:number;
  emailSession: string | null = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private questionService: QuestionService,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.validateIsAuthenticated();
    this.getQuestions();
    this.getUsers();
    this.getEmailSession();
    console.log(this.users);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Button Events
  toggleDarkMode() {
    document.body.classList.toggle('darkmode');
    if(document.body.classList.contains('darkmode')) {
      this.isDark = true;
    }else{
      this.isDark = false;
    }
  }
  private getQuestions(){
    this.questionService.getListQuestions().subscribe(data => {
      this.questions = data;
      this.numberofquestions= this.questions.length;
      console.log(this.numberofquestions);
    })
  }
  getEmailSession(){
    this.emailSession = localStorage.getItem('email');
  }
  private getUsers(){
    this.userService.getListUsers().subscribe(data=>{
      this.users = data;
      this.dtTrigger.next(this.users);
    })
  }
  logout(){
    if(localStorage.getItem('isAuthenticated')){
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('rol')
      localStorage.removeItem('email')
      this.router.navigate(['home']);
    }
  }
  validateIsAuthenticated(){
    if(localStorage.getItem('isAuthenticated')){
      return
    }
    return this.router.navigate(['login']);
  }

  deleteUser(id:number){
    Swal.fire({
      title: 'Estas seguro de eliminar al usuario?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#2ACFB9',
      confirmButtonText: 'Sí, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(data=>{
        this.getUsers();
        Swal.fire(
          'Eliminado!',
          'el usuario ah sido eliminado correctamente.',
          'success'
        )
        })
      }
    });
  }
  // Function for open alert for show confirm button if it's clicked then should redirect to view, create new theme
  openAlertCreateThemeConfirm(){
    Swal.fire({
      title: '<strong>Crear Tema</strong>',
      text: `si la respuesta es si da Click en el boton`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#2ACFB9',
      confirmButtonText: 'Crear Nuevo Tema',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['registerTheme']);
      }
    })
  }


}
