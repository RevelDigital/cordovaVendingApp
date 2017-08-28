import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController} from 'ionic-angular';
import {revelMachineService} from "../../providers/revel-machine-service-rest";
import {TransactionListPage} from "../transactions-list/transactions-list";
import {machineService} from "../../providers/machine-service-rest";
import {MachineProductPage} from "../machine-product-details/machine-products-list";



@Component({
    selector: 'page-machine-detail',
    templateUrl: 'machine-detail.html'

})
export class MachineDetailPage {

    machine: any;
    machineDetails = [];
    onlineStatus = "Undefined";


    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public machineService: machineService, public revelMachineService: revelMachineService, public toastCtrl: ToastController) {
        this.machine = this.navParams.data;
        console.log(this.machine.name);
        this.revelMachineService.getData().subscribe(
          requestData => {
            var revelDevices = JSON.parse(requestData["_body"]);
            var key = this.machine.registration_key;
            this.machineDetails = revelDevices.filter((machine: any) =>
            (machine.registration_key).indexOf(key) > -1);
          },
          // handle the error, otherwise will break the Observable
          error => console.log(error)
        );


        if(this.machineDetails.length > 0){
          if(Math.abs(Date.parse(this.machineDetails[0].ping_data.timestamp)-Date.now())/60000<=10.0){
            this.onlineStatus = "Online"
          } else{
            this.onlineStatus = "Offline";
          }
          console.log(Math.abs(Date.parse(this.machineDetails[0].ping_data.timestamp)-Date.now())/60000);
          console.log(this.onlineStatus);
          this.machineDetails[0].ping_data.player_version;

        }


    }

    doRefresh(refresher) {
      this.revelMachineService.getData(true);
      this.machineService.getData()
    }

    goToTransactions(machine) {
        this.navCtrl.push(TransactionListPage, machine);
    }
    goToProducts(machine){
      this.navCtrl.push(MachineProductPage, machine);
    }
    goToMessages(machine) {
      //this.navCtrl.push(BrokerDetailPage, machine);
    }

}
