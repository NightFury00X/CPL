import {Component, OnInit} from "@angular/core";
import {PAGE_HEADER_TYPE} from "../../constant";
import {isBoolean} from "util";
import {IModal} from "../../modals/modals.component";

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
    PAGE_TYPE = PAGE_HEADER_TYPE.RULES;

    isDelete: boolean;

    modal: IModal = {
        title: 'Add New Rule',
        hideOnClose: false,
        opened: false,
        closeable: true
    };

    constructor() {
    }

    ngOnInit() {
    }

    onAddRule() {
        this.modal.opened = true;
    }

    remove() {
        this.isDelete = true;
    }

    onCancel(data: any) {
        console.log(data);
        this.isDelete = false;
    }
}
