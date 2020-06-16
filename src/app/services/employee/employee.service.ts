import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
    /**
     * Constructor
     *
     * @param _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {

    }

    /**
     * Get the employee by username
     *
     * @param username
     */
    getEmployee(username: string): Observable<Employee> {
        return this._httpClient.get<Employee>(environment.baseURL + '/employee/' + username)
            .pipe(
                retry(3),
                catchError(this.errorHandler)
            );
    }

    /**
     * Handles errors
     *
     * @param error
     */
    errorHandler(error): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
