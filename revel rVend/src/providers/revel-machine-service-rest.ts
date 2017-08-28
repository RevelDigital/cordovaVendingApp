import {Http} from "@angular/http";
import {ReplaySubject} from "rxjs";
import {Injectable} from "@angular/core";
/**
 * Created by averyknight on 8/23/17.
 */
@Injectable()
export class revelMachineService {
  private dataObs$ = new ReplaySubject(1);

  constructor(private http: Http) { }

  getData(forceRefresh?: boolean) {
    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.dataObs$.observers.length || forceRefresh) {
      this.http.get('http://api.reveldigital.com/api/devices?api_key=PvykAYhri1sINCnWhEqC3A&include_snap=false&group_name=VendingMachines').subscribe(
        data => this.dataObs$.next(data),
        error => {
          this.dataObs$.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this.dataObs$ = new ReplaySubject(1);
        }
      );
    }

    return this.dataObs$;
  }


}
