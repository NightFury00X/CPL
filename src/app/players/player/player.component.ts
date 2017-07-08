import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {BATTING_STYLE, BOWLING_STYLE, PAGE_HEADER_TYPE, PLAYER_ROLE} from "../../constant";
import {NotificationModel} from "../../notifications/notification/notification.model";
import {NotificationService} from "../../notifications/services/notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare let jQuery: any;

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
    playerForm: FormGroup;
    PAGE_TYPE = PAGE_HEADER_TYPE.PLAYER;
    playingRole = PLAYER_ROLE;
    battingStyle = BATTING_STYLE;
    bowlingStyle = BOWLING_STYLE;


    constructor(public notificationsSrv: NotificationService) {
        this.initForm();
    }


    initForm() {
        this.playerForm = new FormGroup({
            playerName: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        console.log(this.playingRole);
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }


    showData(data: any) {
        console.log(data.target.value);
    }

    onSubmit(isValid: boolean, values: any) {
        console.log(values);
        if (isValid) {
            this.notificationsSrv.push(new NotificationModel({
                title: 'Success',
                message: 'League details added!',
                type: 'success',
            }));
        } else {
            this.notificationsSrv.push(new NotificationModel({
                title: 'Error',
                message: 'Invalid form data',
                type: 'danger',
            }));
        }
    }

}
