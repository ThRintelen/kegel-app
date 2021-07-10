import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Player } from './player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayersService {
    presentPlayers$ = new BehaviorSubject<Player[]>([]);

    constructor(private readonly firestore: AngularFirestore) {}

    getPlayers$(clubId: string | undefined): Observable<Player[]> {
        if (clubId === undefined) {
            return of([]);
        }

        return this.firestore
            .collection<Player>('players', ref => ref.where('clubId', '==', clubId).orderBy('name'))
            .get()
            .pipe(map(data => data.docs.map(doc => ({ name: doc.data().name, id: doc.id }))));
    }

    resetPresenPlayers() {
        this.presentPlayers$.next([]);
    }

    getPresentPlayers$(presentPlayers: string[] | undefined): Observable<Player[]> {
        if (this.presentPlayers$.value.length > 0) {
            return this.presentPlayers$;
        }

        const streams$: Observable<Player>[] = [];

        presentPlayers?.forEach(playerId => {
            streams$.push(
                this.firestore
                    .collection<Player>('players')
                    .doc(playerId)
                    .get()
                    .pipe(
                        filter(doc => doc.exists),
                        map(doc => <Player>{ ...doc.data(), id: doc.id }),
                    ),
            );
        });

        return zip(...streams$).pipe(
            map(players => players.sort((a, b) => a.name.localeCompare(b.name))),
            tap(players => this.presentPlayers$.next(players)),
        );
    }
}
