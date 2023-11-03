import { Component } from '@angular/core';
import { IUser } from '../user/IUser';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  users: IUser[] = [];
}
