import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { IActivity } from './interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private activitiesSubject: BehaviorSubject<IActivity[]> = new BehaviorSubject([] as IActivity[]);
  socket = io('http://localhost:3000');

  constructor() {
    this.socket.on('message', (message: string) => {
      this.message$.next(message);
      console.log(message);
      this.socket.on('activityPart', (activityPart: IActivity) => {
        console.log('Received activityPart event:', activityPart);
        const currentActivities = this.activitiesSubject.value;
        const updatedActivities = [...currentActivities, activityPart];
        this.activitiesSubject.next(updatedActivities);
      });
      
    });

    this.socket.on('gameStarted', (gameStarted: any) => {
      console.log('Received gameStarted event:', gameStarted);
      this.message$.next(gameStarted);
    });

    this.socket.on('activityPart', (activityPart: any) => {
      console.log('Received activityPart event:', activityPart);
      this.message$.next(activityPart);
    });
  }

  public getActivities(): Observable<IActivity[]> {
    return this.activitiesSubject.asObservable();
  }

  public sendMessage(message: any): void {
    this.socket.emit('sendActivities', message);
  }

  public startGame(gameId: string): void {
    this.socket.emit('startGame', { gameId });
  }

  public getNewMessage = (): Observable<any> => {
    return this.message$.asObservable();
  };
}