import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game, PenaltyType } from './games.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games: Game[] = [
    {
      id: '1',
      name: 'Hohe Hausnummer',
      description: 'Wer mit drei würfen die höchste Zahl hat, gewinnt.',
      groupGame: false,
      penalty: 0.5,
    },
    {
      id: '2',
      name: 'Niedrige Hausnummer',
      description: 'Wer mit drei würfen die niedrigste Zahl hat, gewinnt.',
      groupGame: false,
      penalty: 1,
    },
    {
      id: '3',
      name: 'Lotto',
      description: 'Verliere den Geldbetrag',
      groupGame: false,
      penalty: PenaltyType.Flex,
    },
  ];

  constructor() {}

  getGame$(gameId: string): Observable<Game> {
    const game: Game | undefined = this.games.find(({ id }) => id === gameId);

    if (game) {
      return of(game);
    }

    throw Error('ganme id not found');
  }

  getGames$(): Observable<Game[]> {
    return of(this.games);
  }
}
