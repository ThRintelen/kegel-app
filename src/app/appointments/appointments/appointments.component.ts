import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../appointments.model';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;

  constructor(private readonly appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.appointments$ = this.appointmentsService.getAppointments();
  }
}
