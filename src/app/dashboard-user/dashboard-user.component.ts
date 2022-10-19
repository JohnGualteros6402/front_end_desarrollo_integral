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
    this.validateIsAuthenticated();
    this.getEmailSession();
  }
  ngOnDestroy(): void {}

  getEmailSession() {
    this.emailSession = localStorage.getItem('email');
  }

  logout() {
    if (localStorage.getItem('isAuthenticated')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('rol');
      localStorage.removeItem('email');
      this.router.navigate(['home']);
    }
  }
  validateIsAuthenticated() {
    if (localStorage.getItem('isAuthenticated')) {
      return;
    }
    return this.router.navigate(['login']);
  }
}
