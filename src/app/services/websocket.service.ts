import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IActivity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private activitiesSubject: BehaviorSubject<IActivity[]> = new BehaviorSubject<IActivity[]>([]);
  public activities$: Observable<IActivity[]> = this.activitiesSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3001');
    this.setupSocket();
  }

  private setupSocket() {
    this.socket.on('message', (message) => {});

    this.socket.on('activityPart', (activityPart: IActivity) => {
      this.activitiesSubject.next([...this.activitiesSubject.value, activityPart]);
    });

    this.socket.on('message', (message) => {
    });
  }

  public sendMessage(message: any): void {
    this.socket.emit('sendActivities', message);
  }

  public getNewMessage = (): Observable<any> => {
    return new Observable((subscriber) => {
      this.socket.on('message', (message) => {
        subscriber.next(message);
      });
    });
  };
}