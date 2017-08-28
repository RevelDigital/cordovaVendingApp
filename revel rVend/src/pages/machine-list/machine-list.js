"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var leaflet_1 = require("leaflet");
var MachineListPage = (function () {
    function MachineListPage(navCtrl, machineService, config) {
        this.navCtrl = navCtrl;
        this.machineService = machineService;
        this.config = config;
        this.searchKey = "";
        this.viewMode = "list";
        this.findAll();
    }
    MachineListPage.prototype.openPropertyDetail = function (machine) {
        this.navCtrl.push(PropertyDetailPage, machine);
    };
    MachineListPage.prototype.onInput = function (event) {
        var key = this.searchKey.toUpperCase();
        this.machines = this.totalMachines.filter(function (machine) {
            return (machine.name + ' ' + machine.id + ' ' + machine.location.address + ' ' + machine.location.city + ' ' + machine.location.state + ' ' + machine.location.postal_Code + ' ' + machine.registration_key).toUpperCase().indexOf(key) > -1;
        });
        if (this.viewMode === "map") {
            this.showMarkers();
        }
    };
    MachineListPage.prototype.onCancel = function (event) {
        console.log(event);
        this.findAll();
    };
    MachineListPage.prototype.findAll = function () {
        var _this = this;
        this.machineService.getData().subscribe(function (requestData) {
            _this.machines = JSON.parse(requestData['_body']);
            _this.totalMachines = _this.machines;
        }, 
        // handle the error, otherwise will break the Observable
        function (error) { return console.log(error); });
    };
    MachineListPage.prototype.showMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = leaflet_1.default.map("map").setView([46.8772, -96.7898], 12);
            leaflet_1.default.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers();
        });
    };
    MachineListPage.prototype.showMarkers = function () {
        var _this = this;
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet_1.default.layerGroup([]);
        this.machines.forEach(function (machines) {
            if (machines['location']['latitude'], machines['location']['longitude']) {
                var marker = leaflet_1.default.marker([machines['location']['latitude'], machines['location']['longitude']]).on('click', function (event) { return _this.openPropertyDetail(event.target.data); });
                marker.data = machines;
                _this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    };
    return MachineListPage;
}());
MachineListPage = __decorate([
    core_1.Component({
        selector: 'page-machine-list',
        templateUrl: 'machine-list.html'
    })
], MachineListPage);
exports.MachineListPage = MachineListPage;
