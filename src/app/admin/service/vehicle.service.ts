import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url: string = "";
  constructor(private constService: ConstService, private http: HttpClient) {
    this.url = `${this.constService.domain}/booking-service/api`
  }

  add (vehicle: any) {
    return this.http.post(`${this.url}/vehicle`,vehicle);
  }
  update (uuid: string, vehicle: any) {
    return this.http.put(`${this.url}/vehicle/${uuid}`,vehicle);
  }
  get(){
    return this.http.get(`${this.url}/vehicle`);
  }
  getAll(){
    return this.http.get(`${this.url}/vehicle/all`);
  }
  delete(uuid: string){
    return this.http.delete(`${this.url}/vehicle/${uuid}`);
  }

}
