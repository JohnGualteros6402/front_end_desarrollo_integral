import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Md5 } from 'ts-md5';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  language: string = 'en';
  buttonMode: HTMLButtonElement;
  iconMoon: string =
    '<img src="../assets/icons-template/icons/moon.svg" alt="moon icon"/>';
  iconSun: string =
    '<img src="../assets/icons-template/icons/brightness-high.svg" alt="sun icon"/>';
  isDark: boolean = false;
  email: HTMLInputElement;
  user: User = new User();
  isAuthenticated: any = false;
  rol: string;
  rolEncript: string;

  responseValidation: boolean = false;

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private router: Router
  ) {
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
    if (document.body.classList.contains('darkmode')) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }
  validateIsAuthenticated() {
    if (localStorage.getItem('isAuthenticated')) {
      this.router.navigate(['dashboard']);
    }
    console.log('no esta autenticado');
  }
  redirectHome() {
    this.router.navigate(['/employees']);
  }
  validateUser(): void {
    this.user.password = Md5.hashStr(this.user.password);
    this.userService
      .validationUser(this.user.email, this.user.password)
      .subscribe((data) => {
        this.isAuthenticated = data;
        localStorage.setItem('isAuthenticated', this.isAuthenticated);
        localStorage.setItem('email', this.user.email);
        this.userService
          .findInformationUsers(this.user.email)
          .subscribe((data) => {
            this.rol = data.role;
            if (this.rol == 'ADMIN') {
              console.log('h');
              this.rolEncript = 'b521caa6e1db82e5a01c924a419870cb72b81635';
            } else if (this.rol == 'CITIZEN') {
              console.log('ht');
              this.rolEncript = '176fa46eb4a5911075462cec2db88d963155c883';
            }
            localStorage.setItem('rol',this.rolEncript);
            if (
              localStorage.getItem('isAuthenticated') &&
              localStorage.getItem('isAuthenticated') == 'true' &&
              localStorage.getItem('rol') ==
                '176fa46eb4a5911075462cec2db88d963155c883'
            ) {
              console.log('CIUDA');
              this.router.navigate(['/dashboard']);
            } else if (
              localStorage.getItem('isAuthenticated') &&
              localStorage.getItem('isAuthenticated') == 'true' &&
              localStorage.getItem('rol') ==
                'b521caa6e1db82e5a01c924a419870cb72b81635'
            ) {
              console.log('ADMIN');
              this.router.navigate(['/forum']);
            }
          });
        
        console.log('end');
      });
    // console.log(this.user.email+" "+ this.user.password);
  }
}
