import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from '../storage/storageService';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  IsAuthorized: any;

  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();

  constructor(private storeService: StorageService) {
    // Al inicializar el servicio, verifica si hay un estado de autenticación almacenado
    if (this.storeService.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storeService.retrieve('IsAuthorized');
      this.authSource.next(this.IsAuthorized);
    }
  }

  // Método para obtener el token de autenticación
  public GetToken(): any {
    return this.storeService.retrieve('authData');
  }

  // Método para restablecer la información de autenticación
  public ResetAuthData() {
    this.storeService.store('authData', '');
    this.IsAuthorized = false;
    this.storeService.store('IsAuthorized', false);
  }

  // Método para establecer la información de autenticación
  public SetAuthData(token: any) {
    this.storeService.store('authData', token);
    this.IsAuthorized = true;
    this.storeService.store('IsAuthorized', true);

    // Notificar a los observadores sobre el cambio en el estado de autenticación
    this.authSource.next(true);
  }

  // Método para cerrar sesión
  public LogOff() {
    this.ResetAuthData();

    // Notificar a los observadores sobre el cambio en el estado de autenticación
    this.authSource.next(false);
  }
}
