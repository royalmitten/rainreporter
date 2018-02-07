import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {Location} from '../../model/location/location.model';
import {Util} from '../util/util.service';

@Injectable()
export class LocationStorage {
    readonly storageKey = 'locations';

    constructor(private storage: Storage, private util: Util) {
    }

    hasLocation(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getLocations().then((result) => {
                if (result) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }, () => {
                reject(false);
            });
        });
    }

    getLocations(): Promise<any> {
        return this.storage.get(this.storageKey)
    }

    saveLocation(location: Location): Promise<boolean> {
        if (!location.id) {
            location.id = this.util.generateId();
        }

        return new Promise<boolean>((resolve, reject) => {
            this.getLocations().then((result) => {
                let locations: Array<any> = [];

                if (result) {
                    locations = result;
                }

                locations.push(location);

                this.storage.set(this.storageKey, locations).then(() => {
                    resolve(true);
                }, () => {
                    reject(false);
                });

            }, () => {
                reject(false);
            });
        });
    }
}