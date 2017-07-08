import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    @Output() onOk: EventEmitter<any> = new EventEmitter();

    @Input() isConfirm: boolean;
    @Input() selectPlayer: boolean;
    isSuccess: boolean;
    isCancel: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    onDelete() {
        this.isConfirm = false;
        this.isSuccess = true;
    }

    onCancel() {
        this.isConfirm = this.isSuccess = false;
        this.isCancel = true;
    }

    onCancellation(data: any) {
        console.log(data);
        this.onOk.emit(true);
    }

}
