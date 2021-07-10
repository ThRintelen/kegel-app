import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClubService } from '../clubs/club.service';
import { Game } from './games.model';

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    constructor(private readonly firestore: AngularFirestore, private readonly clubService: ClubService) {}

    getGame$(gameId: string): Observable<Game> {
        return this.firestore
            .collection<Game>('games')
            .doc(gameId)
            .get()
            .pipe(map(doc => <Game>{ ...doc.data(), id: doc.id }));
    }

    getGames$(): Observable<Game[] | null> {
        return this.clubService.games$.pipe(tap(console.log));
    }
}
