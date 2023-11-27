import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { IActivity } from './interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {} 

  socket = io('http://localhost:3000');


  public sendMessage(message: any): void {
    this.socket.emit('sendActivities', message);
  }

  public getNewMessage = (): Observable<any> => {
    return new Observable((subscriber) => {
      this.socket.on('message', (message) => {
        subscriber.next(message);
      });
      this.socket.on('gameStarted', (gameStarted) => {
        subscriber.next(gameStarted);
      });
      this.socket.on('activityPart', (activityPart) => {
        subscriber.next(activityPart);
      });
    });
  };
}