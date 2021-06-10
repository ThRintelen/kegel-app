import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Club } from './club.model';

@Injectable({
    providedIn: 'root',
})
export class ClubService {
    club$ = new BehaviorSubject<Club | null>(null);

    constructor(private readonly firestore: AngularFirestore) {}

    getClub(clubId: string): Observable<Club> {
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
