import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from './games.model';

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    // TODO ICON pro Game

    constructor(private readonly firestore: AngularFirestore) {}

    getGame$(gameId: string): Observable<Game> {
        return this.firestore
            .collection<Game>('games')
            .doc(gameId)
            .get()
            .pipe(map(doc => <Game>{ ...doc.data(), id: doc.id }));
    }

    getGames$(clubId: string | undefined): Observable<Game[]> {
        if (clubId === undefined) {
            return of([]);
        }

        return this.firestore
            .collection<Game>('games', ref => ref.where('clubId', '==', clubId).orderBy('name'))
            .get()
            .pipe(map(data => data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    }
}
