import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import leaflet from 'leaflet';
import {machineService} from "../../providers/machine-service-rest";

@Component({
    selector: 'page-machine-list',
    templateUrl: 'transactions-list.html'
})
export class TransactionListPage {
    totalTransactions: Array<any>[];
    machines: Array<any>[];
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public machineService: machineService, public config: Config) {
        this.findAll();
    }

    openTransactionDetail(machine: any) {
        //this.navCtrl.push(TransactionsDetailPage, machine);
    }

    onInput(event) {
        let key: string = this.searchKey.toUpperCase();
        this.machines = this.totalTransactions.filter((machine: any) =>
        (machine.name + ' ' + machine.id + ' ' + machine.location.address + ' ' + machine.location.city + ' ' + machine.location.state +  ' ' + machine.location.postal_Code +  ' ' + machine.registration_key).toUpperCase().indexOf(key) > -1);


      }


    onCancel(event) {
        console.log(event);
        this.findAll();
    }

    findAll() {
      this.machineService.getData().subscribe(
        requestData => {
          this.machines = JSON.parse(requestData['_body']);
          this.totalTransactions = this.machines;
        },
        // handle the error, otherwise will break the Observable
        error => console.log(error)
      );
    }



}
