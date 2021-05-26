import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from './player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayersService {
    private players: Player[] = [
        {
            id: '1',
            name: 'Bastian Linsen',
        },
        {
            id: '2',
            name: 'Björn Mende',
        },
        {
            id: '3',
            name: 'Thorsten Rintelen',
        },
        {
            id: '4',
            name: 'Max Wolf',
        },
        {
            id: '5',
            name: 'Dominik Arntz',
        },
        {
            id: '6',
            name: 'Daniel Siebers',
        },
        {
            id: '7',
            name: 'Florian Krebbers',
        },
        {
            id: '8',
            name: 'Jörg Heselmann',
        },
        {
            id: '9',
            name: 'Alexander Japs',
        },
        {
            id: '10',
            name: 'Sebastian Berson',
        },
    ];

    // TODO ClubId pber URL
    getPlayers$(): Observable<Player[]> {
        return of(this.players).pipe(map(player => player.sort((a, b) => a.name.localeCompare(b.name))));
    }

    getPlayersOfAppointment$(_appointmentId: number): Observable<Player[]> {
        return of(this.players).pipe(map(player => player.sort((a, b) => a.name.localeCompare(b.name))));
    }
}
