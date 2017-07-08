import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-cancel',
    templateUrl: './cancel.component.html',
    styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

    @Output() onOk: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onOkClicked() {
        this.onOk.emit(true);
    }

}
