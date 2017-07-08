import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PAGE_HEADER_TYPE} from "../constant";

declare let jQuery: any;

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
    PAGE_TYPE = PAGE_HEADER_TYPE.SCHEDULE;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

}
