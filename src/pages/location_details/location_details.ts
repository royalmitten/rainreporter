import {Component} from '@angular/core';
import {LoadingController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Location} from '../../model/location/location.model'
import {LocationStorage} from "../../services/location/location.storage.service";

@Component({
    selector: 'location-details',
    templateUrl: 'location_details.html'
})
export class LocationDetailsPage {
    location:Location = new Location();

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private locationStorage: LocationStorage
    ) {
        let location = params.get('location');

        if (location) {
            this.location = location;
        }
    }

    updateLocation() {
        // this validation can be handled better with Angular's form groups
        if (!this.location.name || !this.location.country || !this.location.city || !this.location.suburb) {
            this.showError('Please complete all the location fields.');

            return;
        }

        let loader = this.loadingCtrl.create({
            content: 'Saving...'
        });

        loader.present();

        this.locationStorage.saveLocation(this.location).then(() => {
            loader.dismiss();
            this.showSuccess();
        }, () => {
            loader.dismiss();
            this.showError('Failed to save location. Please try again.');
        });
    }

    private showError(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            cssClass: 'toast-error',
            showCloseButton: true,
            closeButtonText: 'Got it!',
        });

        toast.present()
    }

    private showSuccess() {
        let toast = this.toastCtrl.create({
            message: 'Location has been successfully saved.',
            showCloseButton: true,
            closeButtonText: 'Ok!',
            cssClass: 'toast-success'
        });

        toast.present()

        toast.onDidDismiss(() => {
            this.viewCtrl.dismiss(true);
        });
    }
}
