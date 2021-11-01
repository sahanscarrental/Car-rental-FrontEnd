import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService {

  constructor(private constService: ConstService, private http: HttpClient ) { }

  add (payment: any) {
    return this.http.post(`${this.constService.domain}/payment`,payment);
  }
  update (payment: any) {
    return this.http.put(`${this.constService.domain}/payment`,payment);
  }
  get(){
    return this.http.get(`${this.constService.domain}/payment`);
  }
  getAll(){
    return this.http.get(`${this.constService.domain}/payment/all`);
  }
  delete(uuid: string){
    return this.http.delete(`${this.constService.domain}/payment/${uuid}`);
  }
}
