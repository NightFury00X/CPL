import {Component, Input, OnInit} from '@angular/core';
import {IModal} from "../../modals/modals.component";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    @Input() modal: IModal;


    constructor() {
    }

    ngOnInit() {
    }

    onClose(data: any) {
        this.modal.opened = false;
    }

}
