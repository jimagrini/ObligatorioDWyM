import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IActivity } from '../interfaces/activity';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private activitiesSubject: BehaviorSubject<IActivity[]> = new BehaviorSubject<IActivity[]>([]);
  public activities$: Observable<IActivity[]> = this.activitiesSubject.asObservable();
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public users$: Observable<IUser[]> = this.usersSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3001');
    this.setupSocket();
  }

  private setupSocket() {
    this.socket.on('activityPart', (activityPart: IActivity) => {
      this.activitiesSubject.next([...this.activitiesSubject.value, activityPart]);
    });

    this.socket.on('userConnected', (user: IUser) => {
      this.usersSubject.next([...this.usersSubject.value, user]);
    });

    this.socket.on('userDisconnected', (userId: string) => {
      const updatedUsers = this.usersSubject.value.filter(user => user._id !== userId);
      this.usersSubject.next(updatedUsers);
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