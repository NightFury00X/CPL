import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
    @Output() onOk: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onOkClicked() {
        this.onOk.emit(true);
    }

}
