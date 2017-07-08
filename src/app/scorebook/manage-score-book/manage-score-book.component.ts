import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ScoreService} from "../service/score.service";

@Component({
    selector: 'app-manage-score-book',
    templateUrl: './manage-score-book.component.html',
    styleUrls: ['./manage-score-book.component.css']
})
export class ManageScoreBookComponent implements OnInit, OnDestroy {
    @Input() teamId: number;
    isBattingScore: boolean;
    isBowlingScore: boolean;
    isTeamChanged: boolean;

    constructor(private scoreService: ScoreService) {
        this.scoreService.onTeamChanged.subscribe(
            (team: number) => {
                this.isTeamChanged = true;
                this.isBattingScore = true;
                this.isBowlingScore = false;
            }
        )
    }

    ngOnInit() {
        this.isBattingScore = true;
    }

    onBattingScore($event) {
        $event.preventDefault();
        this.isBattingScore = true;
        this.isBowlingScore = false;
        this.isTeamChanged = false;
    }

    onBowlingScore($event) {
        $event.preventDefault();
        this.isBowlingScore = true;
        this.isBattingScore = false;
        this.isTeamChanged = false;
    }

    ngOnDestroy() {
        console.log('abc');
    }
}
