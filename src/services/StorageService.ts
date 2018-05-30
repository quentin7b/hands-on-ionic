import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/observable/fromPromise';
import { Observable } from "rxjs/Observable";
 
@Injectable()
export class StorageService {
 
    constructor(private storage: Storage) {
 
    }

    public isFav(pony: any): Observable<boolean> {
        return Observable.fromPromise(this.storage.get(pony.name));
    }
 
    public favPony(pony: any, isFav: boolean): Observable<any> {
        return Observable.fromPromise(this.storage.set(pony.name, isFav));
    }
}