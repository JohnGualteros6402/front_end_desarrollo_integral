import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // variables
  title = 'angular_senasoft';
  language: string = 'en';
  buttonMode: HTMLButtonElement;
  iconMoon: string =
    '<img src="../assets/icons-template/icons/moon.svg" alt="moon icon"/>';
  iconSun: string =
    '<img src="../assets/icons-template/icons/brightness-high.svg" alt="sun icon"/>';
  isDark: boolean = false;
  isOpenModal: boolean = false;

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.language);
  }
  ngOnInit() {
    AOS.init();
  }

  openModal(){
    this.isOpenModal = true;
  }
  closeModal(){
    this.isOpenModal = false;
  }
  // Funciones
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
}
