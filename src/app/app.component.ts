import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Page} from '../model/pages/page.model';
import {HomePage} from '../pages/home/home';
import {ManageLocationsPage} from '../pages/manage_locations/manage_locations';
import {ReportsPage} from '../pages/reports/reports';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public rootPage: any = HomePage;
    public pages: Array<Page>;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.pages = [
            new Page('Home', 'ios-home', HomePage),
            new Page('Manage Locations', 'ios-map', ManageLocationsPage),
            new Page('Reports', 'md-pie', ReportsPage)
        ];
    }

    openPage() {
        //@todo, add functionality to open pages here
    }
}

