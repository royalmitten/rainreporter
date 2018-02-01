import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public promptLocationAdd: boolean = true;
    public locations: Array<any>;

    constructor(public navCtrl: NavController, private storage: Storage) {
    }

    ionViewDidEnter() {
        this.storage.get('locations').then((result) => {
            if (result) {
                this.promptLocationAdd = false;
            }
        });
    }
}
