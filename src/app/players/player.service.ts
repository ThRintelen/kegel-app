import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayersService {
    constructor() {}

    // TODO Alle Spieler eines Clubs und alle Spieler zu einem Termin
    // TODO Mit HttpApiMock arbeiten
    getPlayers$(): Observable<Player[]> {
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

    getPlayersOfAppointment$(appointmentId: number): Observable<Player[]> {
        console.log(appointmentId);
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
