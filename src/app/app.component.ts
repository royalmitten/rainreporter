import {Component, ViewChild} from '@angular/core';
import {Menu, NavController, Platform} from 'ionic-angular';
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
    @ViewChild('nav') navCtrl: NavController;
    @ViewChild('menu') menu: Menu;

    rootPage: any = HomePage;
    pages: Array<Page>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            statusBar.backgroundColorByHexString('#6796B0');

            splashScreen.hide();
        });

        this.pages = [
            new Page('Manage Locations', 'ios-map', ManageLocationsPage),
            new Page('Reports', 'md-pie', ReportsPage)
        ];
    }

    openPage(page: Page) {
        this.menu.close();
        this.navCtrl.push(page.component);
    }
}

