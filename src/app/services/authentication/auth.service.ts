import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Permission } from '../../models/permission.enum';
import { GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    helper = new JwtHelperService();
    user: SocialUser = new SocialUser();
    socialLoggedIn = false;
    adLoggedIn = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private socialAuthService: SocialAuthService,
        private authServiceAzure: MsalService
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

    decodeToken(token): any {
        return this.helper.decodeToken(token);
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
            this.socialLoggedIn = true;
            this.user = result;
            this.router.navigateByUrl('/pages/dashboard');
        });
    }

    loginWithAzure(): void {
        const loginRequest = {
            scopes: ['user.read', 'openid', 'profile']
        }

        this.authServiceAzure.loginPopup(loginRequest).then(result => {
            this.setToken(result.idToken.rawIdToken);
            this.adLoggedIn = true;
            this.user.email = result.account.userName;
            this.user.name = result.account.name;
            
            console.log(result);
            this.router.navigateByUrl('/pages/dashboard');
        });
    }

    logout(): void {
        localStorage.removeItem('token');

        if (this.socialLoggedIn) {
            this.socialLoggedIn = false;
            this.socialAuthService.signOut().then(_ => {
                this.router.navigateByUrl('/pages/auth/login');
            });
        } else if (this.adLoggedIn) {
            this.adLoggedIn = false;
            this.authServiceAzure.logout();
        }
    }

    getUser(): SocialUser {
        return this.user;
    }



}
