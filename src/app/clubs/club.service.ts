import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Game } from '../games/games.model';
import { Club, ClubData } from './club.model';

@Injectable({ providedIn: 'root' })
export class ClubService {
    club$ = new BehaviorSubject<Club | null>(null);
    games$ = new BehaviorSubject<Game[] | null>(null);

    constructor(private readonly firestore: AngularFirestore) {}

    resteClub() {
        this.club$.next(null);
        this.games$.next(null);
    }

    // TODO Auch die Strafen initial hier laden
    // TODO Auch alle Player mit vollen Daten laden und dann nachher nur noch mit den presented abgleichen

    getClub$(clubId: string): Observable<ClubData> {
        return this.getClubItem$(clubId).pipe(
            switchMap(club => this.getGames$(clubId).pipe(map(games => ({ games, club })))),
        );
    }

    // TODO ICON pro Game
    private getGames$(clubId: string): Observable<Game[]> {
        return this.firestore
            .collection<Game>('games', ref => ref.where('clubId', '==', clubId).orderBy('name'))
            .get()
            .pipe(
                map(data => data.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
                tap(games => this.games$.next(games)),
            );
    }

    private getClubItem$(clubId: string): Observable<Club> {
        return this.firestore
            .collection('clubs')
            .doc<Club | undefined>(clubId)
            .get()
            .pipe(
                map(doc => {
                    if (!doc.exists) {
                        throw new Error('club id not found');
                    }

                    return <Club>{ ...doc.data(), id: doc.id };
                }),
                tap(club => this.club$.next(club)),
            );
    }
}
