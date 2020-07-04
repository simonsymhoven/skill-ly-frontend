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
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigateByUrl('/pages/auth/login');
            return false;
        }
    }
}
