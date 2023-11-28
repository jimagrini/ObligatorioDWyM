import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('gameId');

    this.subscription = this.webSocketService.getNewMessage().subscribe((startedGameId: string) => {
      if (startedGameId === gameId) {
        console.log('Game started! Redirecting to vote...');
        this.router.navigate(['/games', gameId, 'vote']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}