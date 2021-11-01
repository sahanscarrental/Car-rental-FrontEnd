import { Injectable } from '@angular/core';
import {ConstService} from "../admin/service/const.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private _url: string = "";
  constructor( private constService: ConstService, private http: HttpClient ) {
    this._url = `${this.constService.domain}/file-service/api`
  }

  upload(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this._url}/image`, formData);
  }

  retrieve(id: any) {
    return this.http.get(`${this._url}/image/${id}`);
  }


  get url(): string {
    return this._url;
  }
}
