import {Component} from '@angular/core';
import {LocationStorage} from '../../services/location/location.storage.service';
import {ModalController} from 'ionic-angular';
import {LocationDetailsPage} from '../location_details/location_details';
import {Location} from "../../model/location/location.model";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    promptLocationAdd: boolean;
    locations: Array<Location>;
    locationId: string;
    date: Date;
    daysInThisMonth: Array<number>;
    daysInLastMonth: Array<number>;
    daysInNextMonth: Array<number>;
    monthNames: Array<string>;
    dayNames: Array<string>;
    currentMonth: string;
    currentYear: number;
    currentDate: number;

    constructor(
        private modalCtrl: ModalController,
        private locationStorage: LocationStorage
    ) {
    }

    ionViewDidLoad() {
        this.date = new Date();
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        this.getDaysOfMonth();
    }

    ionViewWillEnter() {
        this.checkForLocation();
    }

    checkForLocation() {
        this.locationStorage.hasLocation().then(() => {
            this.promptLocationAdd = false;
            this.getLocations();
        }, () => {
            this.promptLocationAdd = true;
        });
    }

    getDaysOfMonth() {
        this.daysInThisMonth = [];
        this.daysInLastMonth = [];
        this.daysInNextMonth = [];
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();

        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        } else {
            this.currentDate = 999;
        }

        let firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(),
            prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for(let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }

        let thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (let j = 0; j < thisNumOfDays; j++) {
            this.daysInThisMonth.push(j + 1);
        }

        let lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        for (let k = 0; k < (6-lastDayThisMonth); k++) {
            this.daysInNextMonth.push(k+1);
        }

        let totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for(let l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                this.daysInNextMonth.push(l);
            }
        }
    }

    goToLastMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    addLocation() {
        let modal = this.modalCtrl.create(LocationDetailsPage);
        modal.present();

        modal.onDidDismiss((locationAdded) => {
            if (true === locationAdded) {
                this.promptLocationAdd = false;
                this.getLocations();
            }
        })
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

    addRainfall() {

    }
}
