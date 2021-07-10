import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppointmentResult } from './results.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentResultService {
    constructor(private readonly firestore: AngularFirestore) {}

    getResults$(appointmentId: string): Observable<AppointmentResult[]> {
        return this.firestore
            .collection<AppointmentResult>('results', ref => ref.where('appointmentId', '==', appointmentId))
            .valueChanges();
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
