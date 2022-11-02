import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private notifier: NotifierService;

  public constructor( notifier: NotifierService ) {
		this.notifier = notifier;
	}

  ngOnInit(): void {
    this.showNotification('success', 'Conexión a internet restablecida');
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
}
