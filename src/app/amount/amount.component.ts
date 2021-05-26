import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentStoreService } from '../appointments/store.service';
import { PlayersService } from '../players/player.service';

@UntilDestroy()
@Component({
    selector: 'app-amount',
    templateUrl: './amount.component.html',
    styleUrls: ['./amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent implements OnInit {
    data$!: Observable<{ name: string; amount: number | undefined }[]>;

    constructor(
        private readonly appointmentStoreService: AppointmentStoreService,
        private readonly playersService: PlayersService,
        private readonly route: ActivatedRoute,
    ) {}

    // TODO Berchung in einen Servie auslagern

    ngOnInit() {
        this.data$ = this.route.params.pipe(
            untilDestroyed(this),
            switchMap(({ appointmentId }) => this.playersService.getPlayersOfAppointment$(appointmentId)),
            switchMap(players =>
                this.appointmentStoreService.getResults$().pipe(map(results => ({ results, players }))),
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
