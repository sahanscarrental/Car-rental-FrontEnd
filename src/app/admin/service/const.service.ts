import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {

  private _domain: string = "http://localhost:9191"
  constructor() { }


  get domain(): string {
    return this._domain;
  }
}
