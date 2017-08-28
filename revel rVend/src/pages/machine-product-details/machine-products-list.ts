import {Component} from '@angular/core';
import {NavController, ToastController, NavParams, ActionSheetController} from 'ionic-angular';
import {productService} from "../../providers/product-service-rest";


@Component({
    selector: 'page-machine-list',
    templateUrl: 'machine-products-list.html'
})
export class MachineProductPage {


  machine: any;
  productDetails = [];
  searchKey: string = "";



  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public productService: productService, public toastCtrl: ToastController) {
    this.machine = this.navParams.data;
    console.log(this.machine.name);
    this.productService.getData().subscribe(
      requestData => {
        this.productDetails = JSON.parse(requestData["_body"]);
        console.log(requestData);
        console.log(this.productDetails[0].name)
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );



  }

  onInput(event) {
    let key: string = this.searchKey.toUpperCase();
    /*
    this.machines = this.totalMachines.filter((machine: any) =>
    (machine.name + ' ' + machine.id + ' ' + machine.location.address + ' ' + machine.location.city + ' ' + machine.location.state +  ' ' + machine.location.postal_Code +  ' ' + machine.registration_key).toUpperCase().indexOf(key) > -1);
    if (this.viewMode === "map") {
      this.showMarkers();
    }
  */
  }


  onCancel(event) {
    /*
    console.log(event);
    this.findAll();
    */
  }

  openProductEditDetail(product){

  }






}
