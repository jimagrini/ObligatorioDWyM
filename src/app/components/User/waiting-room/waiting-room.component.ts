import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    // Obtiene el ID del juego desde los parámetros de la URL
    const gameId = this.route.snapshot.paramMap.get('gameId');

    // Se suscribe a eventos WebSocket para recibir mensajes sobre el inicio del juego
    this.subscription = this.webSocketService
      .getNewMessage()
      .subscribe((startedGameId: string) => {
        // Verifica si el juego que ha comenzado coincide con el juego actual
        if (startedGameId === gameId) {
          console.log('Game started! Redirecting to vote...');
          // Redirige a la página de votación cuando el juego comienza
          this.router.navigate(['/games', gameId, 'vote']);
        }
      });
  }

  ngOnDestroy() {
    // Se asegura de desuscribirse para evitar pérdida de memoria
    this.subscription.unsubscribe();
  }
}
