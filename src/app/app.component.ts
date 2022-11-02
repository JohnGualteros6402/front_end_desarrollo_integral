import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front_desarrollo_integral';
  netStatus: boolean;
  private notifier: NotifierService;

  public constructor( notifier: NotifierService ) {
		this.notifier = notifier;
	}

  ngOnInit() {
    this.netStatus = navigator.onLine;
    fromEvent(window, 'online').subscribe(e => {
      this.netStatus = true;
      this.showNotification('success', 'Conexión a internet restablecida');
    });
    fromEvent(window, 'offline').subscribe(e => {
      this.netStatus = false;
      this.showNotification('error', 'Conexión a internet perdida');
    });    
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
}
