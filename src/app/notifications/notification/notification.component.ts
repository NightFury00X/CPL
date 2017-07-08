import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "./notification.model";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() notification: NotificationModel;
    state = 'normal';
    constructor(public notificationsCollection: NotificationService) {

    }

    closeNotification($event) {
        this.notificationsCollection.remove(this.notification);
        this.close.emit(this.notification);
    }

    ngOnInit() {
    }

}
