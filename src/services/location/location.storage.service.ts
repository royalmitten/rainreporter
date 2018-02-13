import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {Location} from '../../model/location/location.model';
import {Util} from '../util/util.service';
import * as _ from 'lodash';

@Injectable()
export class LocationStorage {
    readonly storageKey = 'locations';

    constructor(private storage: Storage, private util: Util) {
    }

    hasLocation(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getLocations().then((result) => {
                if (result && result.length) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }, () => {
                reject(false);
            });
        });
    }

    getLocation(locationId: String): Promise<Location | null> {
        return new Promise<Location | null>((resolve, reject) => {
            this.getLocations().then((result) => {
                if (!result) {
                    reject(null);
                }

                let location = _.find(result, (location: Location) => {
                    return location.id === locationId;
                });

                if (_.isEmpty(location)) {
                    reject(null);
                }

                resolve(location);
            }, () => {
                reject(null);
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

                let index = _.findIndex(locations, {id: location.id});

                if (-1 === index) {
                    locations.push(location);
                } else {
                    locations.splice(index, 1, location);
                }

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

    deleteLocation(location: Location): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getLocations().then((locations) => {
                if (!locations) {
                   reject(false)
                }

                _.remove(locations, {id: location.id});

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