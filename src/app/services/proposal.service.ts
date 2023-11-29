import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { IProposal } from '../interfaces/proposal';
import { IActivity } from '../interfaces/activity';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  // Almacena la propuesta en caché para evitar solicitudes innecesarias al servidor.
  private cachedProposal: IProposal | null = null;

  // URL base de la API para las propuestas.
  private proposalsUrl = 'http://localhost:3000/api/proposals';

  // Opciones HTTP para encabezados JSON.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private activitiesService: ActivitiesService
  ) {}

  /**
   * Obtiene todas las propuestas desde el servidor.
   * @returns Observable de un array de propuestas (IProposal[]).
   */
  getProposals(): Observable<IProposal[]> {
    return this.http.get<IProposal[]>(this.proposalsUrl).pipe(
      tap((_) => console.log('fetched proposals')),
      catchError(this.handleError<IProposal[]>('getProposals', []))
    );
  }

  /**
   * Obtiene una propuesta por su ID desde el servidor.
   * @param id Identificador de la propuesta que se va a recuperar.
   * @returns Observable de una propuesta (IProposal).
   */
  getProposal(id: string): Observable<IProposal> {
    if (this.cachedProposal && this.cachedProposal._id === id) {
      return of(this.cachedProposal); // Return the cached proposal if it matches the requested ID
    } else {
      const url = `${this.proposalsUrl}/${id}`;
      return this.http.get<IProposal>(url).pipe(
        tap((_) => console.log(`fetched proposal id=${id}`)),
        catchError(this.handleError<IProposal>(`getProposal id=${id}`))
      );
    }
  }

  /**
   * Agrega una nueva propuesta al servidor.
   * @param name Nombre de la propuesta.
   * @param activities Actividades asociadas a la propuesta.
   * @returns Observable de la propuesta recién creada (IProposal).
   */
  add(name: string, activities: IActivity[]): Observable<IProposal> {
    return this.http
      .post<IProposal>(
        this.proposalsUrl,
        { name, activities },
        this.httpOptions
      )
      .pipe(
        tap((newProposal: IProposal) =>
          console.log(`added proposal w/ id=${newProposal._id}`)
        ),
        catchError(this.handleError<IProposal>('addProposal'))
      );
  }

  /**
   * Elimina una propuesta del servidor.
   * @param id Identificador de la propuesta a eliminar.
   * @returns Observable con un booleano indicando si la operación fue exitosa.
   */
  delete(id: string): Observable<boolean> {
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap((_) => console.log(`deleted proposal id=${id}`)),
      map(() => true), // If the operation is successful, response is mapped into a 'true' boolean
      catchError(this.handleError<boolean>(`deleteProposal id=${id}`))
    );
  }

  /**
   * Obtiene las actividades asociadas a una propuesta por su ID.
   * @param proposalId Identificador de la propuesta.
   * @returns Observable de un array de actividades (IActivity[]).
   */
  getActivities(proposalId: string): Observable<IActivity[]> {
    return this.getProposal(proposalId).pipe(
      tap((_) => console.log(`fetched proposal w/ id=${proposalId}`)),
      switchMap((proposal: IProposal) => {
        return of(proposal.activities);
      })
    );
  }

  /**
   * Maneja errores de las solicitudes HTTP.
   * @param operation Nombre de la operación que produjo el error.
   * @param result Resultado opcional para retornar como un observable.
   * @returns Función que maneja el error y retorna un observable con un resultado específico.
   */
  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
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
