import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";

@Injectable()
export class LocationStorage {
    readonly storageKey = 'locations';

    constructor(private storage: Storage) {
    }

    hasLocation(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.storage.get(this.storageKey).then((result) => {
                if (result) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
}