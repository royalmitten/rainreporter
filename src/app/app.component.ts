import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ManageLocationsPage} from '../pages/manage_locations/manage_locations';
import {ReportsPage} from '../pages/reports/reports';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    pages: Array<{ title: string, icon: string, component: any }>;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.pages = [
            {title: 'Home', icon: 'ios-home', component: HomePage},
            {title: 'Manage Locations', icon: 'ios-map', component: ManageLocationsPage},
            {title: 'Reports', icon: 'md-pie', component: ReportsPage}
        ];
    }

    openPage() {
        //@todo, add functionality to open pages here
    }
}

