import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Appointment } from './appointments.model';

type NewAppointment = Omit<Appointment, 'id'>;

@Injectable({
    providedIn: 'root',
})
export class AppointmentsService {
    appointmen$ = new BehaviorSubject<Appointment | undefined>(undefined);

    constructor(private readonly firestore: AngularFirestore) {}

    getAppointment$(appointmentId: string | undefined): Observable<Appointment> {
        if (this.appointmen$.value) {
            return <Observable<Appointment>>this.appointmen$;
        }

        if (!appointmentId) {
            throw new Error('appointment id not found');
        }

        return this.firestore
            .collection<Appointment>('appointments')
            .doc(appointmentId)
            .get()
            .pipe(
                map(doc => {
                    if (!doc.exists) {
                        throw new Error('appointment id not found');
                    }

                    return <Appointment>{ ...doc.data(), id: doc.id };
                }),
                tap(appointment => this.appointmen$.next(appointment)),
            );
    }

    getAppointments$(clubId: string | undefined): Observable<Appointment[]> {
        if (clubId === undefined) {
            return of([]);
        }

        return this.firestore
            .collection<Appointment>('appointments', ref => ref.where('clubId', '==', clubId).orderBy('date'))
            .get()
            .pipe(map(data => data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    }

    createAppointment(appointment: NewAppointment): Observable<Appointment> {
        return from(this.firestore.collection<NewAppointment>('appointments').add(appointment)).pipe(
            map(doc => ({ ...appointment, id: doc.id })),
        );
    }
}
