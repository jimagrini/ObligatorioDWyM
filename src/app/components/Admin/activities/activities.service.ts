import { Injectable } from '@angular/core';
import { ACTIVITIES } from 'src/app/constants';
import { IActivity } from './IActivity';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';



@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient,private messageService: MessageService){
    
  }

  private activitiesUrl = 'api/activities';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`ActivityService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  selectedActivities: IActivity[] = [];


  getActivities() : Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.activitiesUrl)
    .pipe(
      tap(_ => this.log('fetched activities')),
      catchError(this.handleError<IActivity[]>('getActivities', []))
    );  }

  getActivity(id: number): Observable<IActivity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<IActivity>(url).pipe(
      tap(_ => this.log(`fetched activity id=${id}`)),
      catchError(this.handleError<IActivity>(`getActivity id=${id}`))
    );  }


    updateActivity(activity: IActivity): Observable<any> {
      return this.http.put(this.activitiesUrl, activity, this.httpOptions).pipe(
        tap(_ => this.log(`updated activity id=${activity.id}`)),
        catchError(this.handleError<any>('updateActivity'))
      );
    }

  selectActivity(activity: IActivity) {
    activity.selected = !activity.selected;
    if (!activity.selected) {
      this.selectedActivities.splice(
        this.selectedActivities.indexOf(activity),
        1
      );
    } else {
      this.selectedActivities.push(activity);
    }
  }

  createActivity(activity: IActivity): Observable<IActivity>{
    return this.http.post<IActivity>(this.activitiesUrl, activity, this.httpOptions).pipe(
      tap((newActivity: IActivity) => this.log(`added activity w/ id=${newActivity.id}`)),
      catchError(this.handleError<IActivity>('addActivity'))
    );
  }

  deleteActivity(id : number): Observable<IActivity>{
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete<IActivity>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted activity id=${id}`)),
      catchError(this.handleError<IActivity>('deleteActivity'))
    );
  }
}
