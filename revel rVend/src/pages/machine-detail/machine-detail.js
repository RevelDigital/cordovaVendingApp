"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MachineDetailPage = (function () {
    function MachineDetailPage(actionSheetCtrl, navCtrl, navParams, revelMachineService, toastCtrl) {
        var _this = this;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.revelMachineService = revelMachineService;
        this.toastCtrl = toastCtrl;
        this.machineDetails = [];
        this.onlineStatus = "Undefined";
        this.machine = this.navParams.data;
        console.log(this.machine.name);
        this.revelMachineService.getData().subscribe(function (requestData) {
            var revelDevices = JSON.parse(requestData["_body"]);
            var key = _this.machine.registration_key;
            _this.machineDetails = revelDevices.filter(function (machine) {
                return (machine.registration_key).indexOf(key) > -1;
            });
        }, 
        // handle the error, otherwise will break the Observable
        function (error) { return console.log(error); });
        if (this.machineDetails.length > 0) {
            if (Math.abs(Date.parse(this.machineDetails[0].ping_data.timestamp) - Date.now()) / 60000 <= 10.0) {
                this.onlineStatus = "Online";
            }
            else {
                this.onlineStatus = "Offline";
            }
            console.log(Math.abs(Date.parse(this.machineDetails[0].ping_data.timestamp) - Date.now()) / 60000);
            console.log(this.onlineStatus);
            this.machineDetails[0].ping_data.player_version;
        }
    }
    MachineDetailPage.prototype.goToTransactions = function (machine) {
        //this.navCtrl.push(BrokerDetailPage, machine);
    };
    MachineDetailPage.prototype.goToProducts = function (machine) {
        //this.navCtrl.push(BrokerDetailPage, machine);
    };
    MachineDetailPage.prototype.goToMessages = function (machine) {
        //this.navCtrl.push(BrokerDetailPage, machine);
    };
    return MachineDetailPage;
}());
MachineDetailPage = __decorate([
    core_1.Component({
        selector: 'page-property-detail',
        templateUrl: 'machine-detail.html'
    })
], MachineDetailPage);
exports.MachineDetailPage = MachineDetailPage;
