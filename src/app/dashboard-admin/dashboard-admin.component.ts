import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {


  emailSession: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getEmailSession();
  }

  getEmailSession(){
    this.emailSession = localStorage.getItem('email');
  }
  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
  
}
