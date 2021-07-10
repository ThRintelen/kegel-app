import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentsService } from '../appointments/appointments.service';
import { PlayersService } from '../players/player.service';
import { AppointmentResultService } from '../results/results.service';

@Component({
    selector: 'app-amount',
    templateUrl: './amount.component.html',
    styleUrls: ['./amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent implements OnInit {
    data$!: Observable<{ name: string; amount: number | undefined }[]>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly playersService: PlayersService,
        private readonly appointmentsService: AppointmentsService,
        private readonly appointmentResultService: AppointmentResultService,
    ) {}

    ngOnInit() {
        this.data$ = this.route.params.pipe(
            switchMap(({ appointmentId }) => this.appointmentsService.getAppointment$(appointmentId)),
            switchMap(appointment =>
                this.playersService
                    .getPresentPlayers$(appointment.presentMembers)
                    .pipe(map(players => ({ appointment, players }))),
            ),
            switchMap(({ appointment, players }) =>
                this.appointmentResultService.getResults$(appointment.id).pipe(map(results => ({ results, players }))),
            ),
            map(({ results, players }) =>
                players.map(player => {
                    const amount = results
                        .filter(({ playerId }) => playerId === player.id)
                        .map(({ amount }) => amount)
                        .reduce((prev, curr) => (prev || 0) + (curr || 0), 0);
                    return { name: player.name, amount };
                }),
            ),
            map(result => result.sort((a, b) => ((a.amount || 0) > (b.amount || 0) ? -1 : 1))),
        );
    }
}
