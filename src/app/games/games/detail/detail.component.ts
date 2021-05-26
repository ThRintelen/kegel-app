import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, zip } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppointmentResultType } from 'src/app/appointments/store.model';
import { AppointmentStoreService } from 'src/app/appointments/store.service';
import { PenaltyComponent } from 'src/app/penalty/penalty.component';
import { PenaltyAction, PenaltyDialogResult } from 'src/app/penalty/penalty.model';
import { Player } from '../../../players/player.model';
import { PlayersService } from '../../../players/player.service';
import { Game, PenaltyType } from '../../games.model';
import { GamesService } from '../../games.service';

// TODO Validierungen, kurze Warnung beim speichern
// TODO Auslagern der Berechnungen in Services

@UntilDestroy()
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesDetailComponent implements OnInit {
    penaltyType = PenaltyType;
    data$!: Observable<{ players: Player[]; game: Game }>;

    form = new FormGroup({});

    constructor(
        private readonly playersService: PlayersService,
        private readonly gamesService: GamesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly appointmentStoreService: AppointmentStoreService,
        private readonly dialog: MatDialog,
    ) {}

    ngOnInit() {
        const players$ = this.route.params.pipe(
            switchMap(({ appointmentId }) => this.playersService.getPlayersOfAppointment$(appointmentId)),
            tap(players => {
                players.forEach(player => {
                    const field = new FormControl('');
                    this.form.addControl(player.id, field);
                });
            }),
        );

        const game$ = this.route.params.pipe(switchMap(({ gameId }) => this.gamesService.getGame$(gameId)));

        this.data$ = zip(players$, game$).pipe(map(data => ({ game: data[1], players: data[0] })));
    }

    onClickSubmit(game: Game, players: Player[]) {
        this.route.params.pipe(untilDestroyed(this)).subscribe(({ appointmentId }) => {
            players.forEach(player => {
                let amount = 0;

                if (game.penalty === PenaltyType.Flex) {
                    amount = this.form.value[player.id];
                } else if (this.form.value[player.id]) {
                    amount = game.penalty;
                }

                this.appointmentStoreService.addResult({
                    appointmentId,
                    id: game.id,
                    type: AppointmentResultType.Game,
                    playerId: player.id,
                    amount,
                });
            });

            this.router.navigate(['/appointments', appointmentId, 'games']);
        });
    }

    onClickRow(player: Player) {
        const field = this.form.get(player.id);
        if (!field) {
            return;
        }

        field.setValue(!field.value);
    }

    openDialog(player: Player, players: Player[]) {
        this.dialog
            .open(PenaltyComponent, {
                data: player,
                width: '80%',
                autoFocus: false,
            })
            .afterClosed()
            .pipe(
                untilDestroyed(this),
                filter(dialogResponse => !!dialogResponse),
                switchMap((dialogResponse: PenaltyDialogResult) =>
                    this.route.params.pipe(map(({ appointmentId }) => ({ dialogResponse, appointmentId }))),
                ),
            )
            .subscribe(({ dialogResponse, appointmentId }) => {
                const result = {
                    appointmentId,
                    id: dialogResponse.penalty.id,
                    type: AppointmentResultType.Penalty,
                    playerId: dialogResponse.player.id,
                    amount: dialogResponse.penalty.penalty,
                };

                if (dialogResponse.action === PenaltyAction.Add) {
                    if (dialogResponse.penalty.inverse) {
                        players
                            .filter(({ id }) => id !== dialogResponse.player.id)
                            .forEach(player => {
                                this.appointmentStoreService.addResult({
                                    ...result,
                                    playerId: player.id,
                                });
                            });
                    } else {
                        this.appointmentStoreService.addResult(result);
                    }
                }

                if (dialogResponse.action === PenaltyAction.Remove) {
                    const amount = dialogResponse.penalty.penalty * -1;

                    if (dialogResponse.penalty.inverse) {
                        players
                            .filter(({ id }) => id !== dialogResponse.player.id)
                            .forEach(player => {
                                this.appointmentStoreService.addResult({
                                    ...result,
                                    amount,
                                    playerId: player.id,
                                });
                            });
                    } else {
                        this.appointmentStoreService.addResult({ ...result, amount });
                    }
                }
            });
    }
}
