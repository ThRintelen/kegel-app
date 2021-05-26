import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
            penalty: 1,
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
        {
            id: '4',
            name: 'Tannenbaum',
            description: '',
            groupGame: true,
            penalty: 0.5,
        },
        {
            id: '5',
            name: 'Preispartie',
            description: '',
            groupGame: false,
            penalty: 1,
        },
        {
            id: '6',
            name: 'Menschärgerdichnicht',
            description: '',
            groupGame: false,
            penalty: 1,
        },
        {
            id: '7',
            name: 'Einsacken',
            description: '',
            groupGame: true,
            penalty: 0.5,
        },
        {
            id: '8',
            name: 'Pastörken',
            description: '',
            groupGame: false,
            penalty: 1,
        },
        {
            id: '9',
            name: 'Essen',
            description: 'Pommes, Pizza, Pasta etc.',
            groupGame: false,
            penalty: PenaltyType.Flex,
        },
        {
            id: '10',
            name: 'Sonstiges',
            description: 'Zur freien verfügung, z.B. Mitgliedsbeiträge',
            groupGame: false,
            penalty: PenaltyType.Flex,
        },
        {
            id: '11',
            name: 'Fussball',
            description: 'Tooooooor',
            groupGame: true,
            penalty: 0.5,
        },
    ];

    getGame$(gameId: string): Observable<Game> {
        const game: Game | undefined = this.games.find(({ id }) => id === gameId);

        if (game) {
            return of(game);
        }

        throw Error('ganme id not found');
    }

    getGames$(): Observable<Game[]> {
        return of(this.games).pipe(map(games => games.sort((a, b) => a.name.localeCompare(b.name))));
    }
}
