import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentResult, AppointmentResultType } from './store.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentStoreService {
    private results$ = new BehaviorSubject<AppointmentResult[]>([]);

    constructor() {}

    getResults$(): Observable<AppointmentResult[]> {
        return this.results$.asObservable();
    }

    getResultsByPenaltyId$(penaltyId: string): Observable<AppointmentResult[]> {
        return this.results$
            .asObservable()
            .pipe(
                map(results =>
                    results.filter(result => result.type === AppointmentResultType.Penalty && result.id === penaltyId),
                ),
            );
    }

    addResult(result: AppointmentResult) {
        const currentResults = [...this.results$.value];
        currentResults.push(result);

        this.results$.next(currentResults);
    }
}
