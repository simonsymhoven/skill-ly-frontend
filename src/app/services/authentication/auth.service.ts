import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


const AUTH_API = 'http://localhost:8080/api/v1/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    helper = new JwtHelperService();
    authChange = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router
    )
    {

    }

    /**
     *
     * @param credentials
     */
     login(credentials): Observable<any> {
          return this.http.post(AUTH_API + 'signin', {
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
        return this.http.post(AUTH_API + 'signup', {
          name: employee.name,
          username: employee.username,
          email: employee.email,
          permissions: [employee.permission],
          password: employee.password
        }, httpOptions);
     }

    /**
     *
     */
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/pages/auth/login']);
    }

    /**
     *
     * @param token
     */
    setToken(token): void {
        localStorage.setItem('token', token);
    }

    /**
     *
     */
     isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.helper.isTokenExpired(token);
     }

     getLoggedInEmployeeUsername(): string {
         return this.decodeToken().sub;
     }

    /**
     *
     */
    decodeToken(): any {
        const token = localStorage.getItem('token');
        const decodedToken = this.helper.decodeToken(token);
        return decodedToken;
    }


    /**
     *
     */
    getToken(): any {
        const token = localStorage.getItem('token');
        return token;
    }

    /**
     *
     * @param permissions
     */
    isAuthorized(permissions: string[]): boolean {
        const token = this.decodeToken();
        const employeePermissions = token ? [token.authorities] : [];

        let value = false;
        permissions.forEach(permission => {
        employeePermissions.forEach(employeePermission => {
             if (permission === employeePermission) {
             value = true;
            }
            });
        });

        if (this.isAuthenticated() && value) {
             return true;
        } else {
            return false;
        }
    }
}
