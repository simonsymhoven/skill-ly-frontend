import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    /**
     *
     * @param authService
     * @param router
     */
    constructor(
        private authService: AuthService,
        private router: Router
    )
    {
    }

    /**
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        /* TODO: activation if special permissions are needed
            const permissions = route.data.permissions;
            const isAuthorized = this.authService.isAuthorized(permissions);
            if (!isAuthorized) {
            this.router.navigate(['/pages/auth/login']);
            }
            return isAuthorized;
         */

        if (this.authService.isAuthenticated() || this.authService.isSocialLoggedIn) {
            return true;
        } else {
            this.router.navigateByUrl('/pages/auth/login');
            return false;
        }
    }
}
