import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor() {}

  getPlayers$(_appointmentId: string): Observable<Player[]> {
    const players: Player[] = [
      {
        id: 'csdcs-csdc-dscs',
        name: 'Herbert Peters',
      },
      {
        id: 'dscds-cdscds',
        name: 'Thorsten Rintelen',
      },
    ];

    return of(players);
  }
}
