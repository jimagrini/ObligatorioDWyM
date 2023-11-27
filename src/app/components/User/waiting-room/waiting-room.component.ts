import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.subscription = this.gameService.isGameActive(gameId!).subscribe(isActive => {
      if (isActive) {
        console.log('Game started!');
        this.router.navigate(['/games', gameId, 'vote']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
