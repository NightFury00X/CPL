import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    logout() {
        alert('Hi you have logged out!');
        this.authService.loggedInStatus.emit(false);

    }

}