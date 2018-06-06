import { Injectable } from '@angular/core';

import { APIService } from './APIService';
import { StorageService } from './StorageService';

import { Pony } from '../models/pony.model';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PonyService {

    constructor(private api: APIService, private storage: StorageService) {

    }

    public listPonies(): Observable<Pony[]> {
        return this.api
            .allPonies()
            .flatMap(x => x)
            .flatMap(poney => {
                return this.storage
                    .isFav(poney)
                    .map(isFav => {
                        poney['isFav'] = isFav;
                        return new Pony(
                            poney['name'],
                            poney['description'],
                            poney['avatar_url'],
                            poney['isFav']
                        )
                    })
            })
            .toArray()
    }

    public favPony(pony: any, isFav: boolean): Observable<void> {
        return this.storage.favPony(pony, isFav)
    }

}