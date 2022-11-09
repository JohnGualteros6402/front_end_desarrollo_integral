import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  password: string;
  sended: boolean = false;
  email: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
    console.log(this.email);
  }

  updatePassword() {
    this.sended = true;
    this.password = Md5.hashStr(this.password);
    this.userService.updatePassword(this.email, this.password).subscribe(data => {
      console.log(data);
      this.router.navigate(['login']);
    });
  }

}
