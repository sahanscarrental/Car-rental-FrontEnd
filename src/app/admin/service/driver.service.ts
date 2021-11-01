import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  public currentDriver: any = null;
  private url: string = "";
  constructor( private constService: ConstService, private http: HttpClient ) {
    this.url = `${this.constService.domain}/booking-service/api`
  }
  add (driver: any) {
    return this.http.post(`${this.url}/driver`,driver);
  }
  update (driver: any) {
    return this.http.put<any>(`${this.url}/driver/${driver.id}`,driver);
  }
  get(id: string){
    return this.http.get<any>(`${this.url}/driver/${id}`);
  }
  getAll(){
    return this.http.get(`${this.url}/driver/all`);
  }
  getAllBlackisted(){
    return this.http.get(`${this.url}/driver/all-black-listed`);
  }
  delete(uuid: string){
    return this.http.delete(`${this.url}/driver/${uuid}`);
  }
}
