import { Injectable } from '@angular/core';
import { IAdmin } from '../interfaces/admin';
import { Observable, of, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Almacena el administrador en caché para evitar solicitudes innecesarias al servidor.
  private cachedAdmin: IAdmin | null = null;

  // URL base de la API para los administradores.
  private adminsUrl = 'http://localhost:3000/api/admins';

  // Opciones HTTP para encabezados JSON.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** 
   * Obtiene todos los administradores desde el servidor.
   * @returns Observable de un array de administradores (IAdmin[]).
   */
  getAdmins(): Observable<IAdmin[]> {
    return this.http.get<IAdmin[]>(this.adminsUrl)
      .pipe(
        tap(_ => console.log('fetched admins')),
        catchError(this.handleError<IAdmin[]>('getAdmins', []))
      );
  }

  /** 
   * Obtiene un administrador por su ID desde el servidor.
   * @param id Identificador del administrador que se va a recuperar.
   * @returns Observable de un administrador (IAdmin).
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

  /** 
   * Registra y agrega un nuevo administrador al servidor.
   * @param username Nombre de usuario del administrador.
   * @param password Contraseña del administrador.
   * @returns Observable del administrador recién creado (IAdmin).
   */
  register(username: string, password: string): Observable<IAdmin> {
    const url = `${this.adminsUrl}/register`;
    return this.http.post<IAdmin>(url, { username, password }, this.httpOptions).pipe(
      tap((newAdmin: IAdmin) => console.log(`added admin w/ id=${newAdmin._id}`)),
      catchError(this.handleError<IAdmin>('addAdmin'))
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
