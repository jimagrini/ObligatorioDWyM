import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { IActivity } from './components/Admin/activities/IActivity';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {} 

  socket = io('http://localhost:3001');

  public sendActivities(activities: any[]): void {
    this.socket.emit('sendActivities', activities);
  }

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = (): Observable<any> => {
    return new Observable((subscriber) => {
      this.socket.on('message', (message) => {
        subscriber.next(message);
      });
      this.socket.on('activityPart', (activityPart) => {
        subscriber.next(activityPart);
      });
    });
  };
}