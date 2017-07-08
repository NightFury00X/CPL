import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


export class IModal {
    opened?: boolean;
    title: string;
    closeable?: boolean;
    hideOnClose?: boolean;
}

export const DEFAULTS = {
    opened: false,
    closeable: true,
    title: 'Modal <b>Dialog</b>',
    hideOnClose: false,
};

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css']
})


export class ModalsComponent implements OnInit {
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() onhide: EventEmitter<any> = new EventEmitter();
    @Input() modal: IModal;

    constructor() {
    }

    ngOnInit() {
        this.modal = Object.assign(DEFAULTS, this.modal);
    }

    onClose() {
        if (this.modal.closeable) {
            this.hide();
        }
    }

    hide() {
        this.modal.opened = false;
        let modal: IModal = Object.assign({}, this.modal);
        this.onhide.next(modal);
    }

    private _close() {
        let modal: IModal = Object.assign({}, this.modal);
        delete this.modal;
        this.close.emit(modal);
    }
}
