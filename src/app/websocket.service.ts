import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IActivity } from './interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private message$: BehaviorSubject<string> = new BehaviorSubject('');
  private activitiesSubject: BehaviorSubject<IActivity[]> = new BehaviorSubject(
    [] as IActivity[]
  );
  private socket: Socket;

  constructor() {
    // Establish a WebSocket connection to the server.
    this.socket = io('http://localhost:3000');

    // Listen for 'message' events from the server.
    this.socket.on('message', (message: string) => {
      this.message$.next(message);
      console.log('Received message event:', message);
    });

    // Listen for 'activityPart' events from the server.
    this.socket.on('activityPart', (activityPart: IActivity) => {
      console.log('Received activityPart event:', activityPart);
      const currentActivities = this.activitiesSubject.value;
      const updatedActivities = [...currentActivities, activityPart];
      this.activitiesSubject.next(updatedActivities);
    });

    // Listen for 'gameStarted' events from the server.
    this.socket.on('gameStarted', (gameStarted: any) => {
      console.log('Received gameStarted event:', gameStarted);
      this.message$.next(gameStarted);
    });
  }

  // Get an observable to subscribe to messages.
  public getNewMessage(): Observable<any> {
    return this.message$.asObservable();
  }

  // Get an observable to subscribe to activities.
  public getActivities(): Observable<IActivity[]> {
    return this.activitiesSubject.asObservable();
  }

  // Send a message to the server.
  public sendMessage(message: any): void {
    this.socket.emit('sendActivities', message);
  }

  // Start a game by sending a 'startGame' event to the server.
  public startGame(gameId: string): void {
    this.socket.emit('startGame', { gameId });
  }
}
