import { Injectable } from '@angular/core';
import { IAdmin } from '../IAdmin';
import { IProposal } from './IProposal';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { IActivity } from '../activities/IActivity';
import { ActivitiesService } from '../activities/activities.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private cachedProposal: IProposal | null = null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private activitiesService: ActivitiesService) { }

  /** GET admin proposals from the server. 
   * 
   * @param adminId - admin id
   * @returns - proposals list of admin found
   */
  getProposals(admin: IAdmin): Observable<IProposal[]> {
    const url = `api/${admin.id}/proposals`;
    return this.http.get<IProposal[]>(url)
      .pipe(
        tap(_ => console.log('fetched proposals')),
        catchError(this.handleError<IProposal[]>('getProposals', []))
      );
  }

  /** GET proposal by id. Will 404 if id not found 
   * @param id - unique numeric id
  */
  getProposal(admin: IAdmin, id: number): Observable<IProposal> {
    if (this.cachedProposal && this.cachedProposal.id === id) {
      return of(this.cachedProposal); // Return the cached admin if it matches the requested ID
    } else {
      const url = `api/${admin.id}/proposals/${id}`;
      return this.http.get<IProposal>(url).pipe(
        tap(_ => console.log(`fetched proposal id=${id}`)),
        catchError(this.handleError<IProposal>(`getProposal id=${id}`))
      );
    }
  }

  add(admin: IAdmin, name: string, activities: IActivity[]): Observable<IProposal> {
    const url = `api/${admin.id}/proposals`;
    return this.http.post<IProposal>(url, { name, activities }, this.httpOptions).pipe(
      tap((newProposal: IProposal) => console.log(`added proposal w/ id=${newProposal.id}`)),
      catchError(this.handleError<IProposal>('addProposal'))
    );
  }

  /** DELETE
   * 
   * @param admin 
   * @param id 
   * @returns 
   */
  delete(admin: IAdmin, id: number): Observable<boolean> {
    const url = `api/${admin.id}/proposals/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted proposal id=${id}`)),
      map(() => true), // If the operation is successful, response is mapped into a 'true' boolean
      catchError(this.handleError<boolean>(`deleteProposal id=${id}`))
    );
  }

  // Activities:

  /** POST
   * 
   * @param admin 
   * @param proposalId 
   * @param activityId 
   * @returns 
   */
  addActivity(admin: IAdmin, proposalId: number, activityId: number): Observable<IActivity> {
    return this.getProposal(admin, proposalId).pipe(
      tap(_ => console.log(`fetched proposal w/ id=${proposalId}`)),
      switchMap((proposal: IProposal) => {
        const url = `api/${admin.id}/proposals/${proposalId}/activities/${activityId}`;
        return this.http.post<IActivity>(url, activityId, this.httpOptions).pipe(
          tap(_ => console.log(`added activity to proposal: ${activityId}`),
          catchError(this.handleError<IActivity>('addActivity'))
        ));
      }),
    );
  }
  

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

