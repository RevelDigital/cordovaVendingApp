"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var machine_list_1 = require("../pages/machine-list/machine-list");
var machine_service_rest_1 = require("../providers/machine-service-rest");
var revel_machine_service_rest_1 = require("../providers/revel-machine-service-rest");
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, machineService, revelMachineService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.machineService = machineService;
        this.revelMachineService = revelMachineService;
        this.machines = [];
        this.rootPage = machine_list_1.MachineListPage;
        this.initializeApp();
        this.machineService.getData().subscribe(function (requestData) {
            console.log('ChildComponent', requestData);
        }, 
        // handle the error, otherwise will break the Observable
        function (error) { return console.log(error); });
        this.revelMachineService.getData().subscribe(function (requestData) {
            console.log('ChildComponent', requestData);
        }, 
        // handle the error, otherwise will break the Observable
        function (error) { return console.log(error); });
        this.appMenuItems = [
            { title: 'Machines', component: machine_list_1.MachineListPage, icon: 'home' },
            { title: 'Transactions', component: machine_list_1.MachineListPage, icon: 'swap' },
            { title: 'Messages', component: machine_list_1.MachineListPage, icon: 'alert' },
        ];
        this.accountMenuItems = [
            { title: 'Account Options', component: machine_list_1.MachineListPage, icon: 'ios-contact' },
            { title: 'Logout', component: machine_list_1.MachineListPage, icon: 'log-out' },
        ];
        this.helpMenuItems = [
            { title: 'Contact', component: machine_list_1.MachineListPage, icon: 'contacts' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    core_1.Component({
        templateUrl: 'app.html',
        providers: [machine_service_rest_1.machineService, revel_machine_service_rest_1.revelMachineService]
    })
], MyApp);
exports.MyApp = MyApp;
