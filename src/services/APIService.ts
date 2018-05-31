import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class APIService {

    constructor(private http: Http) {

    }

    public allPonies(): Observable<any[]> {
        var url = 'https://gist.githubusercontent.com/quentin7b/778758560e12f797272638c9ad61cf38/raw/bb6104b7d786dab972a08c0d1c4fe00446f7232e/all.json?'+Date.now();
        return this.http.get(url).map(res => res.json());
    }
}