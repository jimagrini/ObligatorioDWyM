import { Injectable } from '@angular/core';
import { ProposalComponent } from './proposal.component';
import { IProposal } from './IProposal';
import { PROPOSALS } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient,private messageService: MessageService) { 
  
  }

  private log(message: string) {
    this.messageService.add(`ProposalService: ${message}`);
  }

  private proposalsUrl = 'api/proposals';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
  
  selectedPROPOSALS: IProposal[] = [];

  getPROPOSALS() : Observable<IProposal[]> {
    return this.http.get<IProposal[]>(this.proposalsUrl)
    .pipe(
      tap(_ => this.log('fetched proposals')),
      catchError(this.handleError<IProposal[]>('getProposals', []))
    );
  }

  getProposal(id: number): Observable<IProposal> {
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.get<IProposal>(url).pipe(
      tap(_ => this.log(`fetched proposal id=${id}`)),
      catchError(this.handleError<IProposal>(`getproposal id=${id}`))
    );  }

    updateProposal(proposal: IProposal): Observable<any> {
      return this.http.put(this.proposalsUrl, proposal, this.httpOptions).pipe(
        tap(_ => this.log(`updated proposal id=${proposal.id}`)),
        catchError(this.handleError<any>('updateproposal'))
      );
    }
    

  createProposal(proposal: IProposal): Observable<IProposal> {
    return this.http.post<IProposal>(this.proposalsUrl, proposal, this.httpOptions).pipe(
      tap((newProposal: IProposal) => this.log(`added proposal w/ id=${newProposal.id}`)),
      catchError(this.handleError<IProposal>('addProposal'))
    );
  }

  deleteProposal(id : number): Observable<IProposal>{
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.delete<IProposal>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted proposal id=${id}`)),
      catchError(this.handleError<IProposal>('deleteProposal'))
    );
  }
}