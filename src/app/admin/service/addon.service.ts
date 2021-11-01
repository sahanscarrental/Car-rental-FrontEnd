import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  private url: string = "";
  constructor( private constService: ConstService, private http: HttpClient ) {
    this.url = `${this.constService.domain}/booking-service/api`
  }

  add (addon: any) {
    return this.http.post(`${this.url}/addon`,addon);
  }
  update(uuid: string, addon: any) {
    return this.http.put(`${this.url}/addon/${uuid}`, addon);
  }
  get(){
    return this.http.get(`${this.url}/addon`);
  }
  getAll(){
    return this.http.get<any>(`${this.url}/addon/all`);
  }

  getAllAvailable(){
    return this.http.get<any>(`${this.url}/addon/allAvailable`);
  }
  delete(uuid: string){
    return this.http.delete(`${this.url}/addon/${uuid}`);
  }


}
