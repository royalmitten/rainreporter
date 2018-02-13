import {Component} from '@angular/core';
import {LocationStorage} from '../../services/location/location.storage.service';
import {Location} from '../../model/location/location.model';
import {LocationDetailsPage} from "../location_details/location_details";
import {ModalController} from "ionic-angular";

@Component({
    selector: 'manage-locations',
    templateUrl: 'manage_locations.html'
})
export class ManageLocationsPage {
    locations: Array<Location>;

    constructor(
        private locationStorage: LocationStorage,
        private modalCtrl: ModalController
    ) {
    }

    ionViewWillEnter() {
        this.getLocations();
    }

    getLocations() {
        this.locationStorage.getLocations().then((result) => {
            if (result) {
                this.locations = result;
            }
        }, () => {
            this.locations = [];
            // show error message
        });
    }

    updateLocation(locationId ?:String) {
        this.locationStorage.getLocation(locationId).then((location) => {
            this.openLocationModal(location);

        }, () => {
            // handle error
        });
    }

    addLocation() {
        this.openLocationModal();
    }

    private openLocationModal(location ?:Location) {
        let modal = this.modalCtrl.create(LocationDetailsPage, {'location': location});
        modal.present();

        modal.onDidDismiss(() => {
            this.getLocations();
        })
    }
}
