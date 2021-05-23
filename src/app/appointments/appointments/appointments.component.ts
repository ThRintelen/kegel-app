import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge, Observable, of, Subject } from 'rxjs';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';
import { PlayersService } from '../../players/player.service';
import { Appointment } from '../appointments.model';
import { AppointmentsService } from '../appointments.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';

@UntilDestroy()
@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent implements OnInit {
    appointments$: Observable<Appointment[]> = of([]);
    createdAppointment$ = new Subject<Appointment>();

    constructor(
        private readonly playerService: PlayersService,
        private readonly appointmentsService: AppointmentsService,
        private readonly dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.appointments$ = this.appointmentsService.getAppointments().pipe(
            switchMap(appointments =>
                merge(
                    of(appointments),
                    this.createdAppointment$.pipe(map(appointment => [...appointments, appointment])),
                ),
            ),
            // TODO Sortierung der Daten geht noch nicht
            map(appointments => appointments.sort((a, b) => (a.date > b.date ? 1 : -1))),
        );
    }

    onClickCreate() {
        this.dialog
            .open(CreateAppointmentComponent, {
                minWidth: '50%',
                data: this.playerService.getPlayers$(),
            })
            .afterClosed()
            .pipe(
                untilDestroyed(this),
                filter(appointment => !!appointment),
                concatMap((appointment: Appointment) => this.appointmentsService.createAppointment(appointment)),
            )
            .subscribe(appointment => {
                this.createdAppointment$.next(appointment);
            });
    }
}
