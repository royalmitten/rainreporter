import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LocationDetailsPage} from '../pages/location_details/location_details';
import {LocationStorage} from '../services/location/location.storage.service';
import {Util} from '../services/util/util.service';
import {ManageLocationsPage} from "../pages/manage_locations/manage_locations";
import {ReportsPage} from "../pages/reports/reports";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LocationDetailsPage,
        ManageLocationsPage,
        ReportsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            scrollAssist: false,
            autoFocusAssist: true
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LocationDetailsPage,
        ManageLocationsPage,
        ReportsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LocationStorage,
        Util,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
