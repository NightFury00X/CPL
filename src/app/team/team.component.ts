import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PAGE_HEADER_TYPE} from "../constant";
declare let jQuery: any;

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit {
    PAGE_TYPE = PAGE_HEADER_TYPE.TEAM;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

}
