import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4200');
  }

  public sendMessage(message: string): void {
    this.socket.emit('mensajeDesdeCliente', message);
  }

  public listenForMessages(callback: (message: string) => void): void {
    this.socket.on('mensajeDesdeCliente', (message: string) => {
      callback(message);
    });
  }
}