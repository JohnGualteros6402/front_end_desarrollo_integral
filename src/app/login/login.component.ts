import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  language: string = 'en';
  buttonMode: HTMLButtonElement;
  iconMoon: string =
    '<img src="../assets/icons-template/icons/moon.svg" alt="moon icon"/>';
  iconSun: string =
    '<img src="../assets/icons-template/icons/brightness-high.svg" alt="sun icon"/>';
  isDark: boolean = false;
  email: HTMLInputElement ;
  user : User = new User;
  isAuthenticated: any = false;



  responseValidation: boolean = false;


  constructor(public translate: TranslateService, private userService:UserService, private router: Router) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.language);
  }

  ngOnInit(): void {
    this.validateIsAuthenticated();
  }
  changeLanguage(language: string) {
    this.translate.use(language);
  }
  toggleDarkMode() {
    document.body.classList.toggle('darkmode');
    if(document.body.classList.contains('darkmode')) {
      this.isDark = true;
    }else{
      this.isDark = false;
    }
  }
  validateIsAuthenticated(){
    if(localStorage.getItem('isAuthenticated')){
      this.router.navigate(['dashboard'])
    }
    console.log("no esta autenticado")
  }
  redirectHome(){
    this.router.navigate(['/employees']);
  }
  validateUser(): void{
    this.userService.validationUser(this.user.email, this.user.password).subscribe(data => {
      this.isAuthenticated = data;
      localStorage.setItem('isAuthenticated', this.isAuthenticated);
      localStorage.setItem('email', this.user.email);
      if(localStorage.getItem('isAuthenticated') && localStorage.getItem('isAuthenticated') == "true"){
        this.router.navigate(['dashboard'])
      }
    });
    // console.log(this.user.email+" "+ this.user.password);
  }
}
