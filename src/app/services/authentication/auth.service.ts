import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Permission } from '../../models/permission.enum';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    helper = new JwtHelperService();
    isSocialLoggedIn : boolean;

    constructor(
        private http: HttpClient,
        private router: Router,
        private socialAuthService: SocialAuthService
    )
    {

    }

    /**
     *
     * @param credentials
     */
     login(credentials): Observable<any> {
          return this.http.post(environment.baseURL + '/auth/signin', {
            username: credentials.username,
            password: credentials.password
          }, httpOptions).pipe(
               map((data) => {
                 const key = 'accessToken';
                 this.setToken(data[key]);
               }),
               catchError(error => {
                 return throwError(error);
               })
          );
     }

    /**
     *
     * @param employee
     */
    register(employee): Observable<any> {
        return this.http.post(environment.baseURL + '/auth/signup', {
          name: employee.name,
          username: employee.username,
          email: employee.email,
          permissions: [Permission.user],
          password: employee.password
        }, httpOptions);
     }

    /**
     *
     */





    // ------------------

    isAuthenticated(): boolean {
        return !this.helper.isTokenExpired(this.getToken());
    }

    decodeToken(): any {
        return this.helper.decodeToken(this.getToken());
    }

    getToken(): any {
        return localStorage.getItem('token');
    }

    setToken(token): void {
        localStorage.setItem('token', token);
    }

    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((result) => {
            this.setToken(result.idToken);
            this.isSocialLoggedIn = true;
        });
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    logout(): void {
        localStorage.removeItem('token');
        this.signOut();
        this.isSocialLoggedIn = false;
        this.router.navigateByUrl('/pages/auth/login');
    }

    getSocialLoggedInUser(): Observable<SocialUser> {
        return this.socialAuthService.authState;
    }

}
