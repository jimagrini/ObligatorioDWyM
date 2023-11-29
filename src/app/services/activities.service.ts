import { Injectable } from '@angular/core';
import { IActivity } from '../interfaces/activity';
import { IProposal } from '../interfaces/proposal';
import { CATEGORIES } from 'src/app/constants';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { IAdmin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  // Almacena la actividad en caché para evitar solicitudes innecesarias al servidor.
  private cachedActivity: IActivity | null = null;

  // URL base de la API para las actividades.
  private activitiesUrl = 'http://localhost:3000/api/activities';

  // Opciones HTTP para encabezados JSON.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  
  // Array de actividades seleccionadas.
  selectedActivities: IActivity[] = [];

  /** 
   * Obtiene todas las actividades desde el servidor.
   * @returns Observable de un array de actividades (IActivity[]).
   */
  getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.activitiesUrl)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<IActivity[]>('getActivities', []))
      );
  }

  /** 
   * Obtiene una actividad por su ID desde el servidor.
   * @param id Identificador de la actividad que se va a recuperar.
   * @returns Observable de una actividad (IActivity).
   */
  getActivity(id: string): Observable<IActivity> {
    if (this.cachedActivity && this.cachedActivity._id === id) {
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

  /** 
   * Agrega una nueva actividad al servidor.
   * @param name Nombre de la actividad.
   * @param category Categoría de la actividad.
   * @param description Descripción de la actividad.
   * @param image URL de la imagen asociada a la actividad.
   * @returns Observable de la actividad recién creada (IActivity).
   */
  add(name: string, category: string, description: string, image: string): Observable<IActivity> {
    if (CATEGORIES.find(c => c === category)) {
      return this.http.post<IActivity>(this.activitiesUrl, { name, category, description, image }, this.httpOptions).pipe(
        tap((newActivity: IActivity) => console.log(`added activity w/ id=${newActivity._id}`)),
        catchError(this.handleError<IActivity>('add'))
      );
    } else {
      alert('The specified category is not valid.')
      return of();
    }
  }

  /** 
   * Elimina una actividad especificada del servidor.
   * @param id Identificador de la actividad que se va a eliminar.
   * @returns Observable booleano indicando si la operación fue exitosa.
   */
  delete(id: number): Observable<boolean> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted activity id=${id}`)),
      map(() => true), // If the operation is successful, response is mapped into a 'true' boolean
      catchError(this.handleError<boolean>(`delete id=${id}`))
    );
  }

  /** 
   * Obtiene todas las actividades asociadas a una propuesta desde el servidor.
   * @param admin Objeto IAdmin que representa al administrador.
   * @param proposal Objeto IProposal que representa la propuesta.
   * @returns Observable de un array de actividades (IActivity[]).
   */
  getActivitiesFromProposal(admin: IAdmin, proposal: IProposal): Observable<IActivity[]> {
    const url = `http://localhost:3000/api/proposals/${proposal._id}/activities`;
    return this.http.get<IActivity[]>(url)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<IActivity[]>('getActivitiesFromProposal', []))
      );
  }

  /** 
   * Obtiene una actividad específica asociada a una propuesta desde el servidor.
   * @param admin Objeto IAdmin que representa al administrador.
   * @param proposal Objeto IProposal que representa la propuesta.
   * @param id Identificador de la actividad que se va a recuperar.
   * @returns Observable de una actividad (IActivity).
   */
  getActivityFromProposal(admin: IAdmin, proposal: IProposal, id: string): Observable<IActivity> {
    const url = `http://localhost:3000/api/proposals/${proposal._id}/activities/${id}`;
    return this.http.get<IActivity>(url)
      .pipe(
        tap(_ => console.log('fetched activity')),
        catchError(this.handleError<IActivity>('getActivityFromProposal'))
      );
  }

  /** 
   * Selecciona o deselecciona una actividad específica asociada a una propuesta en el servidor.
   * @param admin Objeto IAdmin que representa al administrador.
   * @param proposal Objeto IProposal que representa la propuesta.
   * @param id Identificador de la actividad que se va a seleccionar o deseleccionar.
   * @returns Observable de una actividad (IActivity).
   */
  selectActivity(admin: IAdmin, proposal: IProposal, id: string): Observable<IActivity> {
    return this.getActivityFromProposal(admin, proposal, id).pipe(
      tap(_ => console.log(`fetched activity w/ id=${id}`)),
      switchMap((activity: IActivity) => {
        if (!activity.selected) {
          const url = `api/proposals/${proposal._id}/${activity._id}`;
          return this.http.delete(url).pipe(
            map(() => activity), // Return the original activity after successful deletion
            catchError(this.handleError<IActivity>('selectActivity'))
          );
        } else {
          // Lógica para marcar la actividad como seleccionada en el backend
          const url = `api/${admin._id}/proposals/${proposal._id}/activities/${activity._id}`;
          return this.http.put<IActivity>(url, activity as IActivity);
        }
      }),
      catchError(this.handleError<IActivity>('selectActivity'))
    );
  }

  /** 
   * Maneja errores de las solicitudes HTTP.
   * @param operation Nombre de la operación que produjo el error.
   * @param result Resultado opcional para retornar como un observable.
   * @returns Función que maneja el error y retorna un observable con un resultado específico.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar el error a la infraestructura de registro remoto
      console.error(error); // registrar en la consola en su lugar

      // TODO: mejorar la transformación del error para el consumo del usuario
      console.log(`${operation} failed: ${error.message}`);

      // Permitir que la aplicación siga ejecutándose devolviendo un resultado vacío.
      return of(result as T);
    };
  }
}
