import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {MachineListPage} from '../pages/machine-list/machine-list';
import {MachineDetailPage} from '../pages/machine-detail/machine-detail';
import {TransactionListPage} from '../pages/transactions-list/transactions-list';





import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MachineProductPage} from "../pages/machine-product-details/machine-products-list";


@NgModule({
  declarations: [
    MyApp,

    MachineListPage,
    TransactionListPage,
    MachineDetailPage,
    MachineProductPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MachineListPage,
    TransactionListPage,
    MachineDetailPage,
    MachineProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
