import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user : User = new User;
  // Save all municipies in the array
  municipies: any = [];
  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getMunicipies();
  }
  getMunicipies() {
    this.http.get('../../assets/municipality.json').subscribe(response=>{
      this.municipies = response;
      console.log(this.municipies);
    })
  }
  saveUser(){
    console.log(this.user.numberdocument);
    this.userService.addUser(this.user).subscribe(data=>{
      console.log(data);
      this.redirectDashboard();
    }, err => console.log(err));
  }
  redirectDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onSubmit(){
    this.saveUser();
  }
}
