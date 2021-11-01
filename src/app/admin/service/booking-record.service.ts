import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingRecordService {

  private url: string = "";
  constructor( private constService: ConstService, private http: HttpClient ) {
    this.url = `${this.constService.domain}/booking-service/api`
  }
  add (booking: any) {
    return this.http.post<any>(`${this.url}/booking`,booking);
  }
  addAsDTO (booking: any) {
    return this.http.post<any>(`${this.url}/booking/createFromDTO`,booking);
  }
  update (booking: any) {
    return this.http.put<any>(`${this.url}/booking/${booking.id}`,booking);
  }

  extendDropTime(bookingID: any, extendedDropTime: any) {
    return this.http.put<any>(`${this.url}/booking/extend-drop`, {},
        {params: {'id': bookingID, extendedDropDateTime: extendedDropTime}});
  }
  get(){
    return this.http.get(`${this.url}/booking`);
  }

  getReportData(from: any, to: any){
    return this.http.get<any>(`${this.url}/booking/report?from=${to}&to=${from}`);
  }

  getAll(driverId: string | null = null){
    let url = ""
    driverId != null ? url=`${this.url}/booking/all/${driverId}`: url=`${this.url}/booking/all`
    return this.http.get<any>(url);
  }
  delete(uuid: string){
    return this.http.delete(`${this.url}/booking/${uuid}`);
  }

}
