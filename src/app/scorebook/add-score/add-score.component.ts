import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScoreService} from "../service/score.service";
declare let jQuery: any;

@Component({
    selector: 'app-add-score',
    templateUrl: './add-score.component.html',
    styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit, AfterViewInit {
    isTeamSelected: boolean;
    teamId: number;
    teamA: boolean;
    teamB: boolean;
    isDisabled: boolean;


    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

    onTeamChange(value) {
        this.isDisabled = true;
        this.teamId = value;
        // this.scoreService.onTeamChanged.emit(value);
        if (value === 1) {
            this.teamA = true;
            this.teamB = false;
        } else {
            this.teamA = false;
            this.teamB = true;
        }
        this.isTeamSelected = true;
    }

    onTeamSelectionCancel() {
        this.isDisabled = false;
        this.teamId = null;
        this.teamA = this.teamB = false;
    }

}
