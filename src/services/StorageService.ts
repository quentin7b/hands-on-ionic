import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class StorageService {
 
    constructor(private storage: Storage) {
 
    }

    public isFav(pony: any) {
        return this.storage.get(pony.name);
    }
 
    public favPony(pony: any) {
        return this.storage.set(pony.name, true);
    }

    public unfavPony(pony: any) {
        return this.storage.set(pony.name, false);
    }
}