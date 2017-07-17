import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./notifications/services/notification.service";
import {NotificationModel} from "./notifications/notification/notification.model";
import {Observable} from "rxjs/Observable";
import {ACTIONS, AppService, IApp} from "./services/app.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {TokenManagerService} from "./services/token-manager.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLogedIn: boolean = false;
    notifications: Observable<NotificationModel[]>;
    state: IApp;
    isAuth$: Subscription;
    state$: Subscription;


    constructor(public notificationsSrv: NotificationService,
                private appService: AppService,
                private router: Router,
                private tokenManager: TokenManagerService) {
        this.appService.$stream
            .subscribe((state) =>
                this.state = state
            );
    }

    ngOnInit() {
        this.notifications = this.notificationsSrv.$stream;
        this.state$ = this.appService.$stream
            .subscribe((state) =>
                this.state = state);

        this.appService.setToken(this.tokenManager.get());

        this.isAuth$ = this.appService.$stream
            .filter((state) => state.action === ACTIONS.AUTHENTICATION_CHANGE)
            .subscribe((state) => {
                this.isLogedIn = !!state.isAuthenticated;
            });
    }
}
