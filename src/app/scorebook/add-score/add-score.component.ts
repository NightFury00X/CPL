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
    isBattingScore: boolean;
    isBowlingScore: boolean;
    teamId: number;
    teamA: boolean;
    teamB: boolean;

    constructor(private scoreService: ScoreService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

    onTeamChange(value) {
        this.teamId = value;
        this.scoreService.onTeamChanged.emit(value);
        if (value === 1) {
            this.teamA = true;
            this.teamB = false;
        } else {
            this.teamA = false;
            this.teamB = true;
        }
        this.isTeamSelected = true;
        this.isBattingScore = true;
    }

    onBattingScore($event) {
        $event.preventDefault();
        this.isBattingScore = true;
        this.isBowlingScore = false;
    }

    onBowlingScore($event) {
        $event.preventDefault();
        this.isBattingScore = false;
        this.isBowlingScore = true;
    }

}
