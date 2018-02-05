import {Component} from '@angular/core';
import {LoadingController, ToastController, ViewController} from 'ionic-angular';
import {Location} from '../../model/location/location.model'

@Component({
    selector: 'location-details',
    templateUrl: 'location_details.html'
})
export class LocationDetailsPage {
    location:Location = new Location();

    constructor(
        public viewCtrl: ViewController,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
    ) {
    }

    updateLocation() {
        let loader = this.loadingCtrl.create({
            content: 'Saving...'
        });

        loader.present();



        this.showError();
    }

    private showError() {
        let toast = this.toastCtrl.create({
            message: 'Please complete all the location fields.',
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
    }
}
