import { Injectable } from '@angular/core';
import { AppointmentResult } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStoreService {
  private results: AppointmentResult[] = [];

  constructor() {}

  addResult(result: AppointmentResult) {
    this.results.push(result);
    console.log(this.results);
  }
}
