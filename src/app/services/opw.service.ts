import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OpwService {
  opwKey: string;
  opwEndPoint: string;

  constructor() { 
    this.opwKey = environment.OPWapiKey
    this.opwEndPoint = environment.opwApiEndPoint
  }

  getWeather(){

  }
}
