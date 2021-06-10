import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppointmentResult } from './store.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentStoreService {
    constructor(private readonly firestore: AngularFirestore) {}

    getResults$(): Observable<AppointmentResult[]> {
        return this.firestore.collection<AppointmentResult>('results').valueChanges();
    }

    getResultsByPenaltyId$(penaltyId: string): Observable<AppointmentResult[]> {
        return this.firestore
            .collection<AppointmentResult>('results', ref => ref.where('contextId', '==', penaltyId))
            .valueChanges();
    }

    addResult(result: AppointmentResult) {
        this.firestore.collection('results').add(result);
    }
}
