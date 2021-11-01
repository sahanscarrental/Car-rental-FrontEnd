import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ConstService} from "../admin/service/const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactUsMessageService {

  private url: any;
  constructor( private router: Router,private constService: ConstService, private http: HttpClient ) {
    this.url = `${this.constService.domain}/c-val-service/api`
  }

  add(contactUsMessage: object  ){
    return this.http.post(`${this.url}/contact-us`, contactUsMessage)
  }
}
