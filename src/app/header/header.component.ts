import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AppService, DEFAULTS, IApp} from "../services/app.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ROUTES} from "../constant";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    state: IApp = DEFAULTS;
    state$: Subscription;
    signout$: Subscription;
    userFullName: string;

    constructor(private authService: AuthService,
                private router: Router,
                private appService: AppService) {
        this.state$ = this.appService.$stream.subscribe(
            (state) => {
                this.state = state;
                if(state.user){
                    // this.userFullName = (state.user.firstName = state.user.lastName)
                }
                console.log("State: ", this.state);
            }
        );
    }

    ngOnInit() {
    }

    signout($event) {
        $event.preventDefault();
        this.signout$ = this.authService.signout().subscribe(
            () => {
                this.router.navigate(ROUTES.NON_AUTHORIZED_ROUTE);
            },
            () => {
                console.log('Signout Unsuccessful!');
            }
        );
    }

    ngOnDestroy() {
        this.state$.unsubscribe();
        this.signout$.unsubscribe();
    }

}
