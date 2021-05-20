import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Penalty } from './penalty.model';

@Injectable({
  providedIn: 'root',
})
export class PenaltyService {
  penalties: Penalty[] = [
    {
      id: '1',
      name: 'Pudel',
      description: 'Wurf in die Gosse',
      penalty: 0.5,
      inverse: false,
    },
    {
      id: '2',
      name: 'Kackstuhl',
      description: 'Wenn die Kegel 1,3,5 und 7 stehe bleiben',
      penalty: 0.2,
      inverse: false,
    },
    {
      id: '3',
      name: 'Stiener',
      description: 'Drei durch',
      penalty: 0.2,
      inverse: false,
    },
    {
      id: '4',
      name: 'Abgeräumt',
      description: 'Alle 9ne',
      penalty: 1,
      inverse: true,
    },
  ];

  constructor() {}

  getPenalties$(): Observable<Penalty[]> {
    return of(this.penalties);
  }
}
