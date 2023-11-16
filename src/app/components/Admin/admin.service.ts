import { Injectable, inject } from '@angular/core';
import { IAdmin } from './IAdmin';
import { IActivity } from './activities/IActivity';
import { ADMINISTRATORS } from 'src/app/constants';
import { ActivitiesService } from './activities/activities.service';
import { ProposalService } from './proposal/proposal.service';
import { IProposal } from './proposal/IProposal';

import { Observable, of, EMPTY, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string;
  private httpClient = inject(HttpClient);



  private cachedAdmin: IAdmin | null = null;

  private adminsUrl = 'api/admins';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  constructor(private http: HttpClient,
    private activitiesService: ActivitiesService,
    private proposalService: ProposalService) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  async register(formValue: any) {
    const response = await firstValueFrom(this.httpClient.post<any>(`${this.adminsUrl}/register`, formValue));
    return response;
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
   * @param id -  unique numeric id
  */
  getAdmin(id: number): Observable<IAdmin> {
    if (this.cachedAdmin && this.cachedAdmin.id === id) {
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

  /** POST: add new admin to the server
   * 
   * @param username 
   * @param password 
   * @returns object admin (type IAdmin) created
   */
  add(username: string, password: string): Observable<IAdmin> {
    const url = `${this.adminsUrl}/register`;
    return this.http.post<IAdmin>(url, { username, password }, this.httpOptions).pipe(
      tap((newAdmin: IAdmin) => console.log(`added admin w/ id=${newAdmin.id}`)),
      catchError(this.handleError<IAdmin>('addAdmin'))
    );
  }

  /** GET proposals by adminId. Calls getAdmin method
   * 
   * @param id - admin id
   * @returns - proposals list of admin found
   */
  /*getProposals(id: number): Observable<IProposal[]> {
    return this.getAdmin(id).pipe(
      tap((admin: IAdmin) => console.log(`fetched admin w/ id=${admin.id}`)),
      switchMap((admin: IAdmin) => {
        return this.proposalService.getProposals(admin);
      }),
      catchError(this.handleError<IProposal[]>('getProposals'))
    );
  }*/

  /** GET proposal by adminId, proposalId. Calls getAdmin method
   * 
   * @param adminId 
   * @param proposalId 
   * @returns 
   */
  /*getProposal(adminId: number, proposalId: number): Observable<IProposal> {
    return this.getAdmin(adminId).pipe(
      tap((admin: IAdmin) => console.log(`fetched admin w/ id=${admin.id}`)),
      switchMap((admin: IAdmin) => {
        return this.proposalService.getProposal(admin, proposalId);
      }),
      catchError(this.handleError<IProposal>('getProposal'))
    );
  }*/

  /** POST: add new proposal (to the specified admin) to the server
   * 
   * @param adminId 
   * @param name 
   * @param activities 
   * @returns 
   */
  /*addProposal(adminId: number, name: string, activities: IActivity[]): Observable<IProposal> {
    return this.getAdmin(adminId).pipe(
      tap((admin: IAdmin) => console.log(`fetched admin w/ id=${admin.id}`)),
      switchMap((admin: IAdmin) => {
        return this.proposalService.add(admin, name, activities);
      }),
      catchError(this.handleError<IProposal>('addProposal'))
    );
  }*/

  /** DELETE: remove proposal (of the specified admin) from the server
   * 
   * @param adminId 
   * @param proposalId 
   * @returns 
   */
  /*deleteProposal(adminId: number, proposalId: number): Observable<boolean> {
    return this.getAdmin(adminId).pipe(
      tap((admin: IAdmin) => console.log(`fetched admin w/ id=${admin.id}`)),
      switchMap((admin: IAdmin) => {
        return this.proposalService.delete(admin, proposalId);
      }),
      catchError(this.handleError<boolean>('deleteProposal'))
    );
  }*/

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * 
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
