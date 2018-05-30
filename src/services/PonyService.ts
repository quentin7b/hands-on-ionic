import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/observable/fromPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
 
@Injectable()
export class PonyService {
 
    constructor(private http:Http) {
 
    }
 
    public allPonies(): Observable<any[]> {
        var url = 'https://gist.githubusercontent.com/quentin7b/778758560e12f797272638c9ad61cf38/raw/298e07d7b2204861232485b11aeefa1d9ae4795b/all.json';
        return this.http.get(url).map(res => res.json());
    }    
}