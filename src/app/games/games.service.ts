import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './games.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor() {}

  getGame$(id: string): Observable<Game> {
    console.log(id);

    return of({
      id: '1',
      name: 'Hohe Hausnummer',
      description: 'Wer mit drei würfen die höchste Zahl hat, gewinnt.',
      groupGame: false,
      penalty: 1,
    });
  }

  getGames$(): Observable<Game[]> {
    const games: Game[] = [
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
        id: '2',
        name: 'Lotto',
        description: 'Verliere den Geldbetrag',
        groupGame: false,
        penalty: 'flex',
      },
    ];

    return of(games);
  }
}
