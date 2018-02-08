import {Component} from '@angular/core';
import {LocationStorage} from '../../services/location/location.storage.service';
import {Location} from '../../model/location/location.model';

@Component({
    selector: 'manage-locations',
    templateUrl: 'manage_locations.html'
})
export class ManageLocationsPage {
    locations: Array<Location>

    constructor(private locationStorage: LocationStorage) {
    }

    ionViewDidLoad() {
        this.locationStorage.getLocations().then((result) => {
            if (result) {
                this.locations = result;
            }
        });
    }

    viewLocation(locationId: string) {
    }

    addLocation() {
    }
}
