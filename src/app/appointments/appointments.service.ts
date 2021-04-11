import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from './appointments.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor() {}

  getAppointments(): Observable<Appointment[]> {
    return of<Appointment[]>([
      {
        id: 'cds-cd-c-sd',
        date: '2019-09-01T00:00:00Z',
        presentMembers: ['123', '1232', 'fr'],
        playedGames: [],
        openPaymentAmount: 312.23,
      },
    ]);
  }
}
