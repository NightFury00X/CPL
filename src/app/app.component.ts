import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {NotificationService} from "./notifications/services/notification.service";
import {NotificationModel} from "./notifications/notification/notification.model";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLogedIn: boolean = true;
    notifications: Observable<NotificationModel[]>;

    constructor(private authService: AuthService,
                public notificationsSrv: NotificationService) {
        this.authService.loggedInStatus.subscribe(
            (status: boolean) => this.isLogedIn = status
        );
    }

    ngOnInit() {
        this.notifications = this.notificationsSrv.$stream;
    }
}
