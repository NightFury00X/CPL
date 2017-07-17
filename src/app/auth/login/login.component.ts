import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationModel} from "../../notifications/notification/notification.model";
import {NotificationService} from "../../notifications/services/notification.service";
import {ISignin} from "../model/signin";
import {Shared, SigninFormControlls} from "../shared";
import {AuthService} from "../../services/auth.service";
import {JwtTokenHelper} from "../../services/token-manager.service";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {ROUTES} from "../../constant";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;

    constructor(public notificationsSrv: NotificationService,
                private formBuilder: FormBuilder,
                private auth: AuthService,
                private jwtTokenHelper: JwtTokenHelper,
                private appService: AppService,
                private router: Router) {
        let signinCoontrolls: SigninFormControlls = Shared.getSigninFormControlls();
        this.email = signinCoontrolls.email;
        this.password = signinCoontrolls.password;

        this.loginForm = formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    ngOnInit() {
    }

    onSubmit(isValid: boolean, credentials: ISignin) {
        if (isValid) {
            this.auth.signin(credentials).subscribe(
                (resp) => {
                    this.auth.storeJwt(resp);
                    this.jwtTokenHelper.toString(resp.token);
                    this.appService.setToken(resp.token);
                    this.redirect();
                },
                (error) => {
                    this.notificationsSrv.push(new NotificationModel({
                        title: 'Error',
                        message: error, // 'Invalid credentials, Please try again!',
                        type: 'danger',
                    }));
                }
            );
        } else {
            this.notificationsSrv.push(new NotificationModel({
                title: 'Error',
                message: 'Something went wrong. Please try again!',
                type: 'danger',
            }));
        }
    }

    private redirect(redirectUrl?: string) {
        if (redirectUrl) {
            this.router.navigateByUrl((redirectUrl));
        } else {
            this.router.navigate(ROUTES.POST_SIGNIN_ROUTE);
        }
    }

}
