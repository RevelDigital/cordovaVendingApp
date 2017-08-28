import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {MachineListPage} from '../pages/machine-list/machine-list';
import {machineService} from "../providers/machine-service-rest";
import {revelMachineService} from "../providers/revel-machine-service-rest";
import {productService} from "../providers/product-service-rest";







export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}



@Component({
    templateUrl: 'app.html',
    providers:[ machineService, revelMachineService, productService]
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    machines: any = [];
    rootPage: any = MachineListPage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private machineService: machineService, private productService: machineService, private revelMachineService: revelMachineService) {
        this.initializeApp();

        this.machineService.getData().subscribe(
          requestData => {
            console.log('ChildComponent', requestData);
          },
          // handle the error, otherwise will break the Observable
          error => console.log(error)
        );

        this.revelMachineService.getData().subscribe(
          requestData => {
            console.log('ChildComponent', requestData);
          },
          // handle the error, otherwise will break the Observable
          error => console.log(error)
        );

        this.productService.getData().subscribe(
          requestData => {
            console.log('ChildComponent', requestData);
          },
          // handle the error, otherwise will break the Observable
          error => console.log(error)
        );

        this.appMenuItems = [
            {title: 'Machines', component: MachineListPage, icon: 'home'},
            {title: 'Transactions', component: MachineListPage, icon: 'swap'},
            {title: 'Messages', component: MachineListPage, icon: 'alert'},
        ];

        this.accountMenuItems = [
            {title: 'Account Options', component: MachineListPage, icon: 'ios-contact'},
            {title: 'Logout', component: MachineListPage, icon: 'log-out'},
        ];

        this.helpMenuItems = [
            {title: 'Contact', component: MachineListPage, icon: 'contacts'},
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
