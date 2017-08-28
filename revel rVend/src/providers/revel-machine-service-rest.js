"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
/**
 * Created by averyknight on 8/23/17.
 */
var revelMachineService = (function () {
    function revelMachineService(http) {
        this.http = http;
        this.dataObs$ = new rxjs_1.ReplaySubject(1);
    }
    revelMachineService.prototype.getData = function (forceRefresh) {
        var _this = this;
        // If the Subject was NOT subscribed before OR if forceRefresh is requested
        if (!this.dataObs$.observers.length || forceRefresh) {
            this.http.get('http://api.reveldigital.com/api/devices?api_key=PvykAYhri1sINCnWhEqC3A&include_snap=false&group_name=VendingMachines').subscribe(function (data) { return _this.dataObs$.next(data); }, function (error) {
                _this.dataObs$.error(error);
                // Recreate the Observable as after Error we cannot emit data anymore
                _this.dataObs$ = new rxjs_1.ReplaySubject(1);
            });
        }
        return this.dataObs$;
    };
    return revelMachineService;
}());
revelMachineService = __decorate([
    core_1.Injectable()
], revelMachineService);
exports.revelMachineService = revelMachineService;
