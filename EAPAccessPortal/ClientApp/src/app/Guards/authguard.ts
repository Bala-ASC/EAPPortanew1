import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const currentUser = JSON.parse(localStorage.getItem('UserDetails'));;//this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
         // not logged in so redirect to login page with the return url and return false
         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
         return false;
        // this.router.navigate(['/']);
        // return false;
    }
}