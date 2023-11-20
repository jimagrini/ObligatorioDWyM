import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, catchError, tap } from 'rxjs';

import { IProposal } from '../interfaces/proposal';
import { IGame } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private cachedGame: IGame | null = null;

  private gamesUrl = 'http://localhost:3000/api/games';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  constructor(private http: HttpClient) { }

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
  getGame(id: number): Observable<IGame> {
    if (this.cachedGame && this.cachedGame.id === id) {
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
      return this.http.post<IGame>(this.gamesUrl, { proposal }, this.httpOptions).pipe(
        tap((newGame: IGame) => console.log(`added game w/ id=${newGame.id}`)),
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
  addUser(id: number, nickname: string): Observable<any> {
    if (id && nickname) {
      const url = `${this.gamesUrl}/${id}/users`;
      return this.http.post<any>(url, { id, nickname }, this.httpOptions).pipe(
        tap((user: any) => console.log(`added user: ${user}`)),
        catchError(this.handleError<any>('addUser'))
      );
    } else {
      console.error('Invalid parameters for adding user.');
      return of(null);
    }
  }

  vote(gameId: string, activityId: string, vote: number) {
    if (gameId && activityId && vote) {
      const url = `${this.gamesUrl}/${gameId}/votes`;
      return this.http.post<any>(url, { gameId, activityId, vote }, this.httpOptions).pipe(
        tap((vote: any) => console.log(`added vote: ${vote}`)),
        catchError(this.handleError<any>('addVote'))
      );
    } else {
      console.error('Invalid parameters for adding user.');
      return of(null);
    }
  }
  

  endGame(id: number): boolean {
    if (!id) {

      

    }
    alert('id not valid.')
    return false;
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
