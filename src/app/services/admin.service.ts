import { Injectable, inject } from '@angular/core';
import { IAdmin } from '../interfaces/admin';
import { ActivitiesService } from './activities.service';
import { ProposalService } from './proposal.service';

import { Observable, of, catchError, tap, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private cachedAdmin: IAdmin | null = null;

  private adminsUrl = 'http://localhost:3000/api/admins';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  constructor(private http: HttpClient) {
  }

  /** GET admins from the server
   * 
   * @returns 
   */
  getAdmins(): Observable<IAdmin[]> {
    return this.http.get<IAdmin[]>(this.adminsUrl)
      .pipe(
        tap(_ => console.log('fetched admins')),
        catchError(this.handleError<IAdmin[]>('getAdmins', []))
      );
  }

  /** GET admin by id. Will 404 if id not found 
   * 
   * Checks if the id equals to the cachedAdmin (avoiding api request).
   * 
   * @param id -  unique string id
  */
  getAdmin(id: string): Observable<IAdmin> {
    if (this.cachedAdmin && this.cachedAdmin._id === id) {
      return of(this.cachedAdmin); // Return the cached admin if it matches the requested ID
    } else {
      const url = `${this.adminsUrl}/${id}`;
      return this.http.get<IAdmin>(url).pipe(
        tap((admin: IAdmin) => {
          this.cachedAdmin = admin; // Cache the fetched admin
          console.log(`fetched admin id=${id}`);
        }),
        catchError(this.handleError<IAdmin>(`getAdmin id=${id}`))
      );
    }
  }

  /** POST: register and add new Admin to the server
   * 
   * @param username 
   * @param password 
   * @returns object admin (type IAdmin) created
   */
  register(username: string, password: string): Observable<IAdmin> {
    const url = `${this.adminsUrl}/register`;
    return this.http.post<IAdmin>(url, { username, password }, this.httpOptions).pipe(
      tap((newAdmin: IAdmin) => console.log(`added admin w/ id=${newAdmin._id}`)),
      catchError(this.handleError<IAdmin>('addAdmin'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * 
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log the error to a remote logging infrastructure
      // Example: Send error details to a remote server for tracking
      // RemoteLoggingService.logError(error);
  
      // Log error to the console
      console.error(error);
  
      // Better error handling - transform error for user consumption
      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        // Client-side network error
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status) {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      } else {
        // Other error (backend or unexpected)
        errorMessage = `Error: ${error.message}`;
      }
  
      // TODO: You can also notify users or display error messages here.
  
      console.log(`${operation} failed: ${errorMessage}`);
  
      // Rethrow the error as a user-facing error and let the app continue
      return throwError(errorMessage) as Observable<T>;
    };
  }
}
