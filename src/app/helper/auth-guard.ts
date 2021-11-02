import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor( private router: Router, private authService: AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const token = this.authService.token;
        const roles = this.authService.roles;
        if (token){
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(roles[0]) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        } else if (Boolean(localStorage.getItem('isLoggedIn'))) {
            // added to handle browser refresh
            const authData = JSON.parse(localStorage.getItem('authData'));
            this.authService.initializeAuthData(authData);
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
