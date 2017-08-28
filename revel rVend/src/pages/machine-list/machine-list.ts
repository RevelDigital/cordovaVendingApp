import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {MachineDetailPage} from '../machine-detail/machine-detail';
import leaflet from 'leaflet';
import {machineService} from "../../providers/machine-service-rest";

@Component({
    selector: 'page-machine-list',
    templateUrl: 'machine-list.html'
})
export class MachineListPage {
    totalMachines: Array<any>[];
    machines: Array<any>[];
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public machineService: machineService, public config: Config) {
        this.findAll();
    }

    openMachineDetail(machine: any) {
        this.navCtrl.push(MachineDetailPage, machine);
    }

    onInput(event) {
        let key: string = this.searchKey.toUpperCase();
        this.machines = this.totalMachines.filter((machine: any) =>
        (machine.name + ' ' + machine.id + ' ' + machine.location.address + ' ' + machine.location.city + ' ' + machine.location.state +  ' ' + machine.location.postal_Code +  ' ' + machine.registration_key).toUpperCase().indexOf(key) > -1);
        if (this.viewMode === "map") {
          this.showMarkers();
        }

      }


    onCancel(event) {
        console.log(event);
        this.findAll();
    }

    findAll() {
      this.machineService.getData().subscribe(
        requestData => {
          this.machines = JSON.parse(requestData['_body']);
          this.totalMachines = this.machines;
        },
        // handle the error, otherwise will break the Observable
        error => console.log(error)
      );
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([46.8772, -96.7898], 12);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);

        this.machines.forEach(machines => {
            if (machines['location']['latitude'], machines['location']['longitude']) {
                let marker: any = leaflet.marker([machines['location']['latitude'], machines['location']['longitude']]).on('click', event => this.openMachineDetail(event.target.data));
                marker.data = machines;
                this.markersGroup.addLayer(marker);
            }
        });

        this.map.addLayer(this.markersGroup);
    }

}
