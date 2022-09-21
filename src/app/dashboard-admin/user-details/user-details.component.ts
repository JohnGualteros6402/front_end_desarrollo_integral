import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number = 0;
  user: User;
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user = data;
    })
  }
}
