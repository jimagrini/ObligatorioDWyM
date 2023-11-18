import { Injectable } from '@angular/core';
import { IActivity } from '../interfaces/activity';
import { IProposal } from '../interfaces/proposal';
import { CATEGORIES } from 'src/app/constants';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { IAdmin } from '../interfaces/admin';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private cachedActivity: IActivity | null = null;

  private activitiesUrl = 'http://localhost:3000/api/activities';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  selectedActivities: IActivity[] = [];

  /** GET activities from the server
   * 
   * @returns 
   */
  getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.activitiesUrl)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<IActivity[]>('getActivities', []))
      );
  }

  /** GET activity by id. Will 404 if id not found 
   * 
   * Checks if the id equals to the cachedActivity (avoiding api request).
   * 
   * @param id 
   * @returns 
   */
  getActivity(id: string): Observable<IActivity> {
    if (this.cachedActivity && this.cachedActivity.id === id) {
      return of(this.cachedActivity); // Return the cached activity if it matches the requested ID
    } else {
      const url = `${this.activitiesUrl}/${id}`;
      return this.http.get<IActivity>(url).pipe(
        tap((activity: IActivity) => {
          this.cachedActivity = activity; // Cache the fetched activity
          console.log(`fetched activity id=${id}`);
        }),
        catchError(this.handleError<IActivity>(`getActivity id=${id}`))
      );
    }
  }

  /** POST: add new activity to the server
   * 
   * @param name 
   * @param category 
   * @param description 
   * @param image 
   * @returns 
   */
  add(name: string, category: string, description: string, image: string): Observable<IActivity> {
    if (CATEGORIES.find(c => c === category)) {
      return this.http.post<IActivity>(this.activitiesUrl, { name, category, description, image }, this.httpOptions).pipe(
        tap((newActivity: IActivity) => console.log(`added activity w/ id=${newActivity.id}`)),
        catchError(this.handleError<IActivity>('add'))
      );
    } else {
      alert('The specified category is not valid.')
      return of();
    }
  }

  /** DELETE: remove specified activity from the server
   * 
   * @param id 
   */
  delete(id: number): Observable<boolean> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted activity id=${id}`)),
      map(() => true), // If the operation is successful, response is mapped into a 'true' boolean
      catchError(this.handleError<boolean>(`delete id=${id}`))
    );
  }

  /** GET
   * 
   * @param admin 
   * @param proposal 
   * @returns 
   */
  getActivitiesFromProposal(admin: IAdmin, proposal: IProposal): Observable<IActivity[]> {
    const url = `http://localhost:3000/api/proposals/${proposal.id}/activities`;
    return this.http.get<IActivity[]>(url)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<IActivity[]>('getActivitiesFromProposal', []))
      );
  }

  /**
   * 
   * @param admin 
   * @param proposal 
   * @param id 
   * @returns 
   */
  getActivityFromProposal(admin: IAdmin, proposal: IProposal, id: string): Observable<IActivity> {
    const url = `http://localhost:3000/api/proposals/${proposal.id}/activities/${id}`;
    return this.http.get<IActivity>(url)
      .pipe(
        tap(_ => console.log('fetched activity')),
        catchError(this.handleError<IActivity>('getActivityFromProposal'))
      );
  }

  /**
   * 
   * @param admin 
   * @param proposal 
   * @param id 
   * @returns 
   */
  selectActivity(admin: IAdmin, proposal: IProposal, id: string): Observable<IActivity> {
    return this.getActivityFromProposal(admin, proposal, id).pipe(
      tap(_ => console.log(`fetched activity w/ id=${id}`)),
      switchMap((activity: IActivity) => {
        if (!activity.selected) {
          const url = `api/proposals/${proposal.id}/${activity.id}`;
          return this.http.delete(url).pipe(
            map(() => activity), // Return the original activity after successful deletion
            catchError(this.handleError<IActivity>('selectActivity'))
          );
        } else {
          // Logic to mark the activity as selected in the backend
          const url = `api/${admin.id}/proposals/${proposal.id}/activities/${activity.id}`;
          return this.http.put<IActivity>(url, activity as IActivity);
        }
      }),
      catchError(this.handleError<IActivity>('selectActivity'))
    );
  }


  /**
   * 
   * @param operation 
   * @param result 
   * @returns 
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
