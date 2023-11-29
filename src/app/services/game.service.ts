import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, catchError, tap, Subject, map } from 'rxjs';

import { IProposal } from '../interfaces/proposal';
import { IGame } from '../interfaces/game';
import { SecurityService } from '../components/Admin/interceptor/securityService';
import { ProposalService } from './proposal.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameStartSource = new Subject<boolean>();
  gameStarted$ = this.gameStartSource.asObservable();
  private cachedGame: IGame | null = null;

  private gamesUrl = 'http://localhost:3000/api/games';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  constructor(private http: HttpClient, private securityService: SecurityService, private proposalService: ProposalService) { }

  getGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.gamesUrl)
      .pipe(
        tap(_ => console.log('fetched games')),
        catchError(this.handleError<IGame[]>('getGames', []))
      );
  }

  /** GET game by id. Will 404 if id not found 
   * 
   * Checks if the id equals to the cachedGame (avoiding api request).
   * 
   * @param id -  unique numeric id
  */
  getGame(id: string): Observable<IGame> {
    if (this.cachedGame && this.cachedGame._id === id) {
      return of(this.cachedGame); // Return the cached game if it matches the requested ID
    } else {
      const url = `${this.gamesUrl}/${id}`;
      return this.http.get<IGame>(url).pipe(
        tap((game: IGame) => {
          this.cachedGame = game; // Cache the fetched game
          console.log(`fetched game id=${id}`);
        }),
        catchError(this.handleError<IGame>(`getGame id=${id}`))
      );
    }
  }

  /**
   * 
   * @param proposal 
   * @returns 
   */
  createGame(proposal: IProposal): Observable<IGame> {
    if (proposal) {
      console.log(`FRONT PROPOSAL=${proposal.name}`);
      return this.http.post<IGame>(this.gamesUrl, { proposal }, this.httpOptions).pipe(
        tap((newGame: IGame) => {
          console.log(`added game w/ id=${newGame._id}`);
          newGame.currentActivity = proposal.activities[0];
        }),
        catchError(this.handleError<IGame>('addGame'))
      );
    } else {
      alert('Proposal not valid. Cannot create game');
      return of();
    }
  }

  /**
   * 
   * @param id - game code
   * @param nickname 
   * @returns 
   */
  addUser(id: string, nickname: string): Observable<any> {
    if (id && nickname) {
      const url = `${this.gamesUrl}/${id}/users`;
      return this.http.post<any>(url, { id, nickname }, this.httpOptions).pipe(
        tap((response: any) => {
          const token = response?.response?.token;
          if (token) {
            console.log(`Added user: ${nickname}`);
            this.securityService.SetAuthData(token);
            sessionStorage.setItem('token', token);
          } else {
            console.error('Token not found in the response');
          }
        }),
        catchError(this.handleError<any>('addUser'))
      );
    } else {
      console.error('Invalid parameters for adding user.');
      return of();
    }
  }

  /**
   * 
   * @param gameId 
   * @param activityId 
   * @param vote 
   * @returns 
   */
  vote(gameId: string, activityId: string, vote: number): Observable<boolean> {
    if (gameId && activityId) {
      if (vote) {
        const url = `${this.gamesUrl}/${gameId}/votes`;
        return this.http.post<boolean>(url, { gameId, activityId, vote }, this.httpOptions).pipe(
          tap((vote: boolean) => console.log(`added vote: ${vote}`)),
          catchError(this.handleError<boolean>('addVote'))
        );
      } else {
        console.log("You already voted this activity");
        return of(false);
      }
    } else {
      console.error(`Invalid parameters for voting ${activityId}`);
      return of(false);
    }
  }

  isGameActive(id: string): Observable<boolean> {
    return this.getGame(id).pipe(
      map(game => game.active),
      catchError(this.handleError<boolean>(`isGameActive id=${id}`))
    );
  }

  startGame(gameId: string): Observable<boolean> {
    const url = `http://localhost:3000/api/startGame/${gameId}`;
    return this.http.post<boolean>(url, { state: true }, this.httpOptions).pipe(
      tap((success: boolean) => console.log(`game started: ${success}`)),
      catchError(this.handleError<boolean>('startGame'))
    );
  }

  endGame(id: string): Observable<boolean> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.put<boolean>(url, { state: false }, this.httpOptions).pipe(
      tap((success: boolean) => console.log(`game ended: ${success}`)),
      catchError(this.handleError<boolean>('startGame'))
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
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
