import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PAGE_HEADER_TYPE} from "../constant";

declare let jQuery: any;

@Component({
    selector: 'app-teammanagement',
    templateUrl: './teammanagement.component.html',
    styleUrls: ['./teammanagement.component.css']
})
export class TeammanagementComponent implements OnInit, AfterViewInit {
    PAGE_TYPE = PAGE_HEADER_TYPE.MANAGETEAM;
    isSelect: boolean;
    isPlayers: boolean;
    isPlayersList: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery('.bootstrap-select').selectpicker();
    }

    onNext() {
        this.isPlayers = true;
        this.isPlayersList = false;
    }

    onSelect() {
        this.isSelect = true;
        this.isPlayersList = false;
    }

    onCancel(data: any) {
        this.isSelect = false;
        console.log(data);
    }

    onList() {
        console.log('ok');
        this.isPlayersList = true;
        this.isSelect = this.isPlayers = false;
    }
}
