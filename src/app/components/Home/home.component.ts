import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  overlayRight: boolean = false;

  gameCode?: number;
  nickname?: string;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
  }

  loginAsAdmin(): void {
    this.router.navigate(['/login']);
  }

  toggleOverlay(): void {
    this.overlayRight = !this.overlayRight;
  }

  joinGame(): void {
    this.gameService.addUser(this.gameCode!, this.nickname!);
    //this.router.navigate(['/waiting-room']);
  }
}
