import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
declare let jQuery: any;

@Component({
    selector: 'app-batting-score',
    templateUrl: './batting-score.component.html',
    styleUrls: ['./batting-score.component.css']
})
export class BattingScoreComponent implements OnInit, AfterViewInit {
    @Input() teamId: number;

    teamName: string;

    constructor() {

    }

    ngOnInit() {
        if (this.teamId === 1) {
            this.teamName = '#Team 1';
        } else if (this.teamId === 2) {
            this.teamName = '#Team 2';
        }
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

}
