import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ScoreService {
    onTeamChanged = new EventEmitter<string>();

    constructor() {
    }

}
