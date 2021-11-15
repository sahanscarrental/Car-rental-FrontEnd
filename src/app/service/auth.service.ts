import { Injectable } from '@angular/core';
import {ConstService} from "../admin/service/const.service";
import {HttpClient} from "@angular/common/http";
import {Role} from "../modals/role";
import {Router} from "@angular/router";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "";
  private b_url: string = "";
  private authUrl: string = "";
  private _token: string;
  private _type: string;
  private _userId: string;
  private _userName: string;
  private _roles: any;
  private _driver: any;
  private _isLoggedIn: boolean = false;
  constructor( private router: Router,private constService: ConstService, private http: HttpClient ) {
    this.url = `${this.constService.domain}/c-val-service/api`
    this.b_url = `${this.constService.domain}/booking-service/api`
  }

  logout () {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("authData");
      this._token = null;
      this._type = null;
      this._userId = null;
      this._driver = null;
      this._roles = null;
      localStorage.setItem('isLoggedIn', String(false));
      this.router.navigate(['/login']);
  }

  login (email: string, password: string) {
    this.http.post<any>(`http://localhost:9191/booking-service/api/auth/sign-in`, {email: email, password: password})
        .subscribe(res => {
            console.log(res);
          const token = res.body.token;
          const type = res.body.type;
          const userId = res.body.id;
          const roles = res.body.roles;
          const driver = res.body.driver;
          this._token = token;
          this._type = type;
          this._userId = userId;
          this.userName = res.body.username;
          this._roles = roles;
          this._driver = driver;

          this.isLoggedIn = true;
          localStorage.setItem('authData', JSON.stringify(res.body));
          localStorage.setItem('isLoggedIn', String(true));

          if (roles[0] == Role.ROLE_ADMIN) {
              this.router.navigate(['/dashboard']);
          }else if (roles[0] == Role.ROLE_DRIVER) {
              this.router.navigate(['/driver']);
          }
        })
  }

    initializeAuthData(authData: any) {
        if (authData) {
            const token = authData.token;
            const type = authData.type;
            const userId = authData.id;
            const roles = authData.roles;
            const driver = authData.driver;
            this._token = token;
            this._type = type;
            this._userId = userId;
            this.userName = authData.username;
            this._roles = roles;
            this._driver = driver;
        }
    }

  reset(email: string, password: string) {
      return this.http.post<any>(`${this.b_url}/auth/fought`, {email: email, password: password});
  }

  emailVerify (otp: number, email: string) {
    return this.http.post<any>(`${this.url}/otp/verify?to=${email}&otp=${otp}`,{});
  }

  otpRequest (email: string) {
      return this.http.post<any>(`${this.url}/otp/request?to=${email}`,{});
  }

  get token(): string {
    return this._token;
  }

  get type(): string {
    return this._type;
  }

  get userId(): string {
    return this._userId;
  }

  get roles(): any {
    return this._roles;
  }

  get driver(): any {
    return this._driver;
  }


    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }


    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }
}
