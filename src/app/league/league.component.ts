import {Component, OnInit} from '@angular/core';
import {PAGE_HEADER_TYPE} from "../constant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../notifications/services/notification.service";
import {NotificationModel} from "../notifications/notification/notification.model";
import {DEFAULT_LEAGUE, ILeague, LeagueModel} from "./league.model";

@Component({
    selector: 'app-league',
    templateUrl: './league.component.html',
    styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
    leagueForm: FormGroup;
    leagueModel: LeagueModel;
    leagueList: LeagueModel[] = [];
    PAGE_TYPE = PAGE_HEADER_TYPE.LEAGUE;

    constructor(public notificationsSrv: NotificationService) {
        this.initForm();
    }

    initForm() {
        let league: ILeague = this.leagueModel;
        this.leagueForm = new FormGroup({
            leagueName: new FormControl(league && league.leagueName, Validators.required),
            leagueYear: new FormControl(league && league.leagueYear, Validators.required)
        });
    }

    ngOnInit() {
    }

    onSubmit(isValid: boolean, values: LeagueModel) {
        if (isValid) {
            this.leagueList.push(values);
            console.log(this.leagueList);
            this.leagueForm.reset();
            this.notificationsSrv.push(new NotificationModel({
                title: 'Success',
                message: 'League details added!',
                type: 'success',
            }));
        } else {
            this.notificationsSrv.push(new NotificationModel({
                title: 'Error',
                message: 'Something went wrong. Please try again!',
                type: 'danger',
            }));
        }
    }
}
