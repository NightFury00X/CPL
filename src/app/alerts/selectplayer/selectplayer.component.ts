import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-selectplayer',
    templateUrl: './selectplayer.component.html',
    styleUrls: ['./selectplayer.component.css']
})
export class SelectplayerComponent implements OnInit {
    @Output() onCancellation: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onCancel() {
        this.onCancellation.emit(true);
    }
}
