import {GenericModel} from "../../utils/index";

export interface INotification {
    title: string;
    message: string;
    type: string;
    tags?: string;
    path?: string;
    isAutodestroyable?: boolean;
    destroyTime?: number;
}

let defaults: INotification = {
    title: 'Title',
    message: '',
    type: 'info',
    tags: '',
    isAutodestroyable: true,
    destroyTime: 4000
};

export class NotificationModel extends GenericModel {
    meta: INotification;

    constructor(notification: INotification) {
        super(notification);
        this.meta = Object.assign({}, defaults, notification);
    }
}
