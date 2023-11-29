import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: any;

  constructor() {
    // Establece el tipo de almacenamiento, en este caso, 'sessionStorage'.
    this.storage = sessionStorage;
  }

  // Recupera un valor del almacenamiento.
  public retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      // Si el elemento existe y no es 'undefined', lo convierte de JSON a objeto.
      return JSON.parse(item);
    }

    return; // Retorna 'undefined' si no se encuentra el elemento.
  }

  // Almacena un valor en el almacenamiento.
  public store(key: string, value: any) {
    // Convierte el valor a cadena JSON y lo almacena en la clave proporcionada.
    this.storage.setItem(key, JSON.stringify(value));
  }
}
