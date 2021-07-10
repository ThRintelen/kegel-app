import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { ClubService } from 'src/app/clubs/club.service';
import { PlayersService } from 'src/app/players/player.service';
import { Appointment, CreateAppointmentData } from '../appointments.model';
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

    constructor(
        private readonly playerService: PlayersService,
        private readonly clubService: ClubService,
        private readonly appointmentsService: AppointmentsService,
        private readonly dialog: MatDialog,
        private readonly cdRef: ChangeDetectorRef,
        private readonly snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.appointments$ = this.getAppointments$();
    }

    onClickCreate() {
        const data$ = this.clubService.club$.pipe(switchMap(club => this.playerService.getPlayers$(club?.id)));

        this.dialog
            .open(CreateAppointmentComponent, {
                minWidth: '50%',
                data: data$,
            })
            .afterClosed()
            .pipe(
                filter(data => !!data),
                switchMap((data: CreateAppointmentData) => this.clubService.club$.pipe(map(club => ({ data, club })))),
                concatMap(({ data, club }) => {
                    if (club === null) {
                        throw new Error('club not found');
                    }

                    return this.appointmentsService.createAppointment({
                        ...data,
                        openPaymentAmount: 0,
                        clubId: club.id,
                    });
                }),
                tap(() => this.snackBar.open('Termin erfolgreich erstellt')),
                untilDestroyed(this),
            )
            .subscribe(() => {
                this.appointments$ = this.getAppointments$();
                this.cdRef.markForCheck();
            });
    }

    private getAppointments$(): Observable<Appointment[]> {
        return this.clubService.club$.pipe(switchMap(club => this.appointmentsService.getAppointments$(club?.id)));
    }
}
