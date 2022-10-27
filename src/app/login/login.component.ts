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
  isAuthenticated: boolean = false;
  rol: string;
  rolEncript: string;
  validating: boolean;

  error: boolean = false;

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
    if (
      !localStorage.getItem('isAuthenticated') ||
      !localStorage.getItem('email') == null
    ) {
      return;
    }
    if (localStorage.getItem('rol') == environment.citizen) {
      return this.router.navigate(['dashboard']);
    }
    return this.router.navigate(['admin']);
  }

  validateUser(): void {
    //Encrypt the password
    this.user.password = Md5.hashStr(this.user.password);
    //send the user to the service email and password
    this.userService
      .validationUser(this.user.email, this.user.password)
      .subscribe((data) => {
        try {
          //if the user is valid
          this.isAuthenticated = data ? true : false;
          //if the user is valid then save in localStorage the authentication and email
          if (this.isAuthenticated) {
            localStorage.setItem(
              'isAuthenticated',
              String(this.isAuthenticated)
            );
            localStorage.setItem('email', this.user.email);
          }
          this.userService
            .findInformationUsers(this.user.email)
            .subscribe((data) => {
              this.rol = data.role;
              this.setRole(this.rol);
            });
        } catch (e) {
          console.log(e);
          console.log('Error');
          this.router.navigate(['error']);
        }
      });
  }
  setRole(rol: string) {
    this.rol = rol;
    if (this.rol == 'CITIZEN') {
      this.rol = environment.citizen;
      this.router.navigate(['dashboard']);
    } else if (this.rol == 'ADMIN') {
      this.rol = environment.admin;
      this.router.navigate(['admin']);
    }
    localStorage.setItem('rol', this.rol);
  }
}
