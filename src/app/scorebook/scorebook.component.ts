import {Component, OnInit} from '@angular/core';
import {PAGE_HEADER_TYPE} from "../constant";
import {ScoreService} from "./service/score.service";

@Component({
    selector: 'app-scorebook',
    templateUrl: './scorebook.component.html',
    styleUrls: ['./scorebook.component.css'],
    providers: [ScoreService]
})
export class ScorebookComponent implements OnInit {

    PAGE_TYPE = PAGE_HEADER_TYPE.SCHEDULE;
    isShow: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    onNext() {
        console.log('Open');
        this.isShow = true;
    }

    onCancel() {
        this.isShow = false;
    }

}
