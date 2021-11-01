import { Injectable } from '@angular/core';
import {ConstService} from "../admin/service/const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebScrapingService {
  private url: string;
  constructor(private constService: ConstService, private http: HttpClient) {
    this.url = `${this.constService.domain}/booking-service/api/web-scraping`
  }

  getNewBeDev() {
    return this.http.get<any>(`${this.url}/newbedev`);
  }
}
