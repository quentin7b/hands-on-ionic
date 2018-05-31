import { Injectable } from '@angular/core';

import { APIService } from './APIService';
import { StorageService } from './StorageService';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PonyService {

    constructor(private api: APIService, private storage: StorageService) {

    }

    public listPonies(): Observable<any[]> {
        return this.api
            .allPonies()
            .flatMap(x => x)
            .flatMap(poney => {
                return this.storage
                    .isFav(poney)
                    .map(isFav => {
                        poney['isFav'] = isFav;
                        return poney;
                    })
            })
            .toArray()
    }

}