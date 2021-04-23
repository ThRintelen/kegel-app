import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor() {}

  getPlayers$(appointmentId: string): Observable<Player[]> {
    console.log(appointmentId);

    const players: Player[] = [
      {
        id: '1',
        name: 'Herbert Peters',
      },
      {
        id: '2',
        name: 'Thorsten Rintelen',
      },
    ];

    return of(players);
  }
}
