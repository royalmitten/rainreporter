import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
    selector: 'location-details',
    templateUrl: 'location_details.html'
})
export class LocationDetailsPage {
    constructor(public viewCtrl: ViewController) {
    }
}
