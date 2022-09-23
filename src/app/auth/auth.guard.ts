import { ActivatedRouteSnapshot, 
    CanActivate, 
    CanLoad, 
    Route, 
    RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private store: Store<fromRoot.State>, private router: Router){}
    
    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));;
    }
}