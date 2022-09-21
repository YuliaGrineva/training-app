import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router){}
    
    canLoad(route: Route) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }    
    }    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }
    }
}