import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  email: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getEmailSession();
  }

  getEmailSession() {
    this.email = localStorage.getItem('email') || '';
    this.getUserByEmail(this.email);
  }

  getUserByEmail(email: string) {
    this.userService.findInformationUsers(email).subscribe(
      (data: User) => {
        this.user = data;
        console.log(this.user);
      }
    )
  }
}
