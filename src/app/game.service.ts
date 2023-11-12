import { Injectable } from '@angular/core';
import { GAMES } from './constants';
import { Game } from './game';
import { IUser } from './components/User/IUser';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  addUser(gameCode: number): boolean {
    if (gameCode) {
      const game = GAMES.find(game => game.id === gameCode) as Game;
      if (game) {
        const user = { id: game.genId() } as IUser;
        game.addUser(user);
        return true;
      }
      alert("¡Ups! Juego no encontrado.");
      return false;
    }
    alert("¡Ups! El código ingresado no es válido.");
    return false;
  }

  startGame(game: Game) {
    if (game) {
      game.active = true;
    }

  }

  endGame(game: Game) {
    if (game) {
      game.active = false;
    }
  }
}
