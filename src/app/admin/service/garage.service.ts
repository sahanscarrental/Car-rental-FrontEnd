import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  private url: string = "";
  constructor(private constService: ConstService,  private http: HttpClient) {
    this.url = `${this.constService.domain}/booking-service/api`
  }
  getAll(){
    return this.http.get(`${this.url}/garage/all`);
  }
}
