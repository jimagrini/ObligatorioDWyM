import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  gameCode: string= "";
  users: IUser[] = [];
}
