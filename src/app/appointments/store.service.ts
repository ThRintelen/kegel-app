import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppointmentResult } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStoreService {
  private results$ = new BehaviorSubject<AppointmentResult[]>([]);

  constructor() {}

  getResults$(): Observable<AppointmentResult[]> {
    return this.results$.asObservable();
  }

  addResult(result: AppointmentResult) {
    const currentResults = [...this.results$.value];
    currentResults.push(result);

    this.results$.next(currentResults);
  }
}
