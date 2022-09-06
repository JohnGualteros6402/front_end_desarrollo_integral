import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

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
  // deleteUser(id:number){
  //   swal({
  //       title: '¿Estas seguro?',
  //       text: "Confirma si deseas eliminar al empleado",
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Si , elimínalo',
  //       cancelButtonText: 'No, cancelar',
  //       confirmButtonClass: 'btn btn-success',
  //       cancelButtonClass: 'btn btn-danger',
  //       buttonsStyling: true
  //     }).then((result) => {
  //       if(result.value){
  //         this.userService.deleteUser(id).subscribe(data=>{
  //           this.getUsers();
  //           swal(
  //             'Empleado eliminado',
  //             'El empleado ha sido eliminado con exito',
  //             'success'
  //           )
  //         })
  //       }
  //     })
  // }

}
