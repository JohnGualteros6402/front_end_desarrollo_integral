import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit, OnDestroy {
  // Variables
  emailSession: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.getEmailSession();
  }
  ngOnDestroy(): void {}

  getEmailSession() {
    this.emailSession = localStorage.getItem('email');
  }

  logout() {
    localStorage.removeItem('rol');
    if (localStorage.getItem('isAuthenticated')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('email');
    }
    this.router.navigate(['home']);
  }

}
