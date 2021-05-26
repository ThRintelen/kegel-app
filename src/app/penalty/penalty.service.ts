import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Penalty } from './penalty.model';

@Injectable({
    providedIn: 'root',
})
export class PenaltyService {
    penalties: Penalty[] = [
        {
            id: '1',
            name: 'Pudel',
            description: 'Wurf in die Gosse',
            penalty: 0.2,
            inverse: false,
        },
        {
            id: '3',
            name: 'Stina',
            description: 'Ab durch die Mitte',
            penalty: 0.2,
            inverse: false,
        },
        {
            id: '2',
            name: 'Kackstuhl',
            description: 'Wenn die Kegel 1,3,5 und 7 stehe bleiben',
            penalty: 0.2,
            inverse: false,
        },
        {
            id: '4',
            name: 'Klingeln',
            description: 'Schnur zu tief?',
            penalty: 0.5,
            inverse: false,
        },
        {
            id: '5',
            name: 'Kein Holz',
            description: 'Kein Pudel, aber auch kein Kegel',
            penalty: 0.5,
            inverse: false,
        },
        {
            id: '6',
            name: 'falsch augeschrieben',
            description: 'Eieieieieie....',
            penalty: 0.5,
            inverse: false,
        },
        {
            id: '7',
            name: 'Abgeräumt',
            description: 'Alle 9ne',
            penalty: 1,
            inverse: false,
        },
        {
            id: '8',
            name: 'Kugel gebracht',
            description: 'Nicht schlafen!',
            penalty: 1,
            inverse: false,
        },
        {
            id: '9',
            name: 'Kugel eingeholt',
            description: 'Schlappi?',
            penalty: 1,
            inverse: false,
        },
        {
            id: '10',
            name: 'Kugel nicht eingeholt',
            description: 'Noch langsamer als die Kugel?',
            penalty: 1,
            inverse: false,
        },
        {
            id: '11',
            name: 'Abräumen',
            description: 'Strafe für alle anderen',
            penalty: 1,
            inverse: true,
        },
        {
            id: '12',
            name: 'Kranz',
            description: 'Strafe für alle anderen',
            penalty: 1,
            inverse: true,
        },
        {
            id: '13',
            name: 'Grobe Strafe',
            description: 'Handynutzung, Bahn beschädigt, Frau auf der Bahn',
            penalty: 5,
            inverse: false,
        },
        {
            id: '14',
            name: 'Lustwurf',
            description: 'Eins nach dem anderen...',
            penalty: 0.5,
            inverse: false,
        },
    ];

    getPenalties$(): Observable<Penalty[]> {
        return of(this.penalties).pipe(map(penalties => penalties.sort((a, b) => a.name.localeCompare(b.name))));
    }
}
