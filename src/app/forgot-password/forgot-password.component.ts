import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string;
  sended: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  sendEmail(){
    this.sended = true;
    this.userService.sendEmail(this.email).subscribe(data => {
      console.log(data);
    });
  }

}
