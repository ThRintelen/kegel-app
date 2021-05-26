import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentStoreService } from '../../appointments/store.service';
import { PlayersService } from '../../players/player.service';

@UntilDestroy()
@Component({
    selector: 'app-focus-penalty',
    templateUrl: './focus.component.html',
    styleUrls: ['./focus.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusPenaltyComponent implements OnInit {
    @Input() penaltyId = '';
    @Input() count = 10;
    data$!: Observable<{ name: string; count: number | undefined }[]>;

    constructor(
        private readonly appointmentStoreService: AppointmentStoreService,
        private readonly playersService: PlayersService,
        private readonly route: ActivatedRoute,
    ) {}

    // TODO Spiel laden um den Titel auszugeben, evtl. Berechnung ändern in Anzahl / Spiel Kosten

    ngOnInit() {
        this.data$ = this.route.params.pipe(
            untilDestroyed(this),
            switchMap(({ appointmentId }) => this.playersService.getPlayersOfAppointment$(appointmentId)),
            switchMap(players =>
                this.appointmentStoreService
                    .getResultsByPenaltyId$(this.penaltyId)
                    .pipe(map(results => ({ results, players }))),
            ),
            map(({ results, players }) =>
                players.map(player => {
                    const countAdd = results.filter(
                        ({ amount, playerId }) => playerId === player.id && amount > 0,
                    ).length;

                    const countSub = results.filter(
                        ({ amount, playerId }) => playerId === player.id && amount < 0,
                    ).length;

                    return { name: player.name, count: countAdd - countSub };
                }),
            ),
            map(result => result.sort((a, b) => ((a.count || 0) > (b.count || 0) ? -1 : 1))),
            map(result => result.slice(0, this.count)),
        );
    }
}
