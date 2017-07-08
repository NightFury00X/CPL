import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
declare let jQuery: any;

@Component({
    selector: 'app-bowling-score',
    templateUrl: './bowling-score.component.html',
    styleUrls: ['./bowling-score.component.css']
})
export class BowlingScoreComponent implements OnInit, AfterViewInit {
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
