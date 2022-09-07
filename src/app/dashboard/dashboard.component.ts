import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    console.log(this.users);
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

  private getUsers(){
    this.userService.getListUsers().subscribe(data=>{
      this.users = data;
    })
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
