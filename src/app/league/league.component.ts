import {Component, OnInit} from "@angular/core";
import {PAGE_HEADER_TYPE} from "../constant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../notifications/services/notification.service";
import {NotificationModel} from "../notifications/notification/notification.model";
import {ILeagueModal, LeagueModel} from "./league.model";
import {LeagueService} from "./league.service";

@Component({
    selector: 'app-league',
    templateUrl: './league.component.html',
    styleUrls: ['./league.component.css'],
    providers: [LeagueService]
})
export class LeagueComponent implements OnInit {
    leagueForm: FormGroup;
    leagueModel: LeagueModel;
    league: ILeagueModal;
    leagueList: LeagueModel[] = [];
    PAGE_TYPE = PAGE_HEADER_TYPE.LEAGUE;

    constructor(public notificationsSrv: NotificationService,
                private leagueService: LeagueService) {
        this.initForm();
    }

    initForm() {
        let league: ILeagueModal = this.league;
        this.leagueForm = new FormGroup({
            _id: new FormControl(league && league["league"]._id),
            leagueName: new FormControl(league && league["league"].leagueName, Validators.required),
            leagueYear: new FormControl(league && league["league"].leagueYear, Validators.required)
        });
    }

    ngOnInit() {
        this.getAllLeagues();
    }

    getAllLeagues() {

    }

    onSubmit(isValid: boolean, values: LeagueModel) {
        if (isValid) {
        } else {
            this.notificationsSrv.push(new NotificationModel({
                title: 'Error',
                message: 'Something went wrong. Please try again!',
                type: 'danger',
            }));
        }
    }

    onEdit(id: any) {

    }

    onDelete(id: any) {

    }
}
