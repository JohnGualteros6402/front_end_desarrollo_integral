import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../classes/user';
import Swal from 'sweetalert2'
import {Subject} from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  users:User[];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<void>();

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url : '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
      }
    };
    this.getUsers();
  }

  private getUsers(){
    this.userService.getListUsers().subscribe(data=>{
      this.users = data;
      this.dtTrigger.next();
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createReportPDF(){
    const pdfMake = require('pdfmake');
    const pdfFonts = require('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let today = new Date;
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let dateTime = `${date} ${time}`;
   
      const pdfDefinition: any = {
        info:{
          title: 'Reporte Eskribe'  
        },
        header: [
      
            {text:'simple text',margin: [5,9,0,0]},
            {text: 'Date '+dateTime,margin: [5,4,5,6]}
            ],
        footer: {
          columns: [
            'Left part',
            { text: 'Right part', alignment: 'right' }
          ]
        },
        content: [
         { text: 'REPORTE ESKRIBE', style: 'header', alignment: 'center' },
           {text: 'Número de temas: 5'},
           {text: 'Número de preguntas: 15'},
           {text: 'Número de usuarios: 1.000'},
          {table: {
           
              headerRows: 1,
              widths: [ '*', 'auto', 100, '*' ],
      
              body: [
                [ 'First', 'Second', 'Third', 'The last one' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                 [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ], [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
              ]
            }}
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
          },
          anotherStyle: {
            italics: true,
            alignment: 'right'
          }
        }
      }
   
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();

  }

  deleteUser(id:number){
    Swal.fire({
      title: 'Estas seguro de eliminar al usuario?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0051de',
      cancelButtonColor: '#111a49',
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'Cancelar'
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
}
