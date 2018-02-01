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
            {title: 'Home', icon: 'ios-home-outline', component: HomePage},
            {title: 'Manage Locations', icon: 'ios-map-outline', component: ManageLocationsPage},
            {title: 'Reports', icon: 'ios-trending-up', component: ReportsPage}
        ];
    }

    openPage() {
        //@todo, add functionality to open pages here
    }
}

