import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AppService} from "./services/app.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
                private appService: AppService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        if (!this.appService.isAuthenticated()) {
            this.router.navigate(["/login"]);
            return false;
        } else {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
