import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Appointment } from 'src/app/appointments/appointments.model';
import { AppointmentsService } from 'src/app/appointments/appointments.service';
import { PenaltyComponent } from 'src/app/penalty/penalty.component';
import { PenaltyAction, PenaltyDialogResult } from 'src/app/penalty/penalty.model';
import { AppointmentResult, AppointmentResultType } from 'src/app/results/results.model';
import { AppointmentResultService } from 'src/app/results/results.service';
import { Player } from '../../../players/player.model';
import { PlayersService } from '../../../players/player.service';
import { Game, PenaltyType } from '../../games.model';
import { GamesService } from '../../games.service';

@UntilDestroy()
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesDetailComponent implements OnInit {
    penaltyType = PenaltyType;
    data$: Observable<{ players: Player[]; game: Game; appointment: Appointment | undefined }> = of();

    form = new FormGroup({});

    constructor(
        private readonly playersService: PlayersService,
        private readonly gamesService: GamesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly appointmentResultService: AppointmentResultService,
        private readonly appointmentsService: AppointmentsService,
        private readonly dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.data$ = this.route.params.pipe(
            switchMap(({ gameId, appointmentId }) =>
                this.gamesService.getGame$(gameId).pipe(map(game => ({ game, appointmentId }))),
            ),
            switchMap(({ game, appointmentId }) =>
                this.appointmentsService
                    .getAppointment$(appointmentId)
                    .pipe(map(appointment => ({ appointment, game }))),
            ),
            switchMap(({ appointment, game }) =>
                this.playersService
                    .getPresentPlayers$(appointment?.presentMembers)
                    .pipe(map(players => ({ players, game, appointment }))),
            ),
            tap(({ players }) => {
                players.forEach(player => {
                    const field = new FormControl('');
                    this.form.addControl(player.id, field);
                });
            }),
        );
    }

    onClickSubmit(game: Game, players: Player[], appointmentId: string | undefined) {
        // TODO rechte Seite aubauen, Spieler eines Termins cachen.
        // TODO Ladebalnken und bestätigung beim speichern?!

        // TODO Validierungen, kurze Warnung / Bestätigung beim speichern
        if (!appointmentId) {
            throw new Error('No appointment id found');
        }

        players.forEach(player => {
            let amount = 0;

            if (game.penalty === PenaltyType.Flex) {
                amount = this.form.value[player.id];
            } else if (this.form.value[player.id]) {
                amount = game.penalty;
            }

            if (amount) {
                this.appointmentResultService.addResult({
                    appointmentId,
                    contextId: game.id,
                    type: AppointmentResultType.Game,
                    playerId: player.id,
                    amount,
                });
            }

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

    // TODO Code in Services auslagern
    openDialog(player: Player, players: Player[]) {
        this.dialog
            .open(PenaltyComponent, {
                data: player,
                width: '80%',
                autoFocus: false,
            })
            .afterClosed()
            .pipe(
                filter(dialogResponse => !!dialogResponse),
                switchMap((dialogResponse: PenaltyDialogResult) =>
                    this.route.params.pipe(map(({ appointmentId }) => ({ dialogResponse, appointmentId }))),
                ),
                untilDestroyed(this),
            )
            .subscribe(({ dialogResponse, appointmentId }) => {
                const result: AppointmentResult = {
                    appointmentId,
                    contextId: dialogResponse.penalty.id,
                    type: AppointmentResultType.Penalty,
                    playerId: dialogResponse.player.id,
                    amount: dialogResponse.penalty.penalty,
                };

                if (dialogResponse.action === PenaltyAction.Add) {
                    if (dialogResponse.penalty.inverse) {
                        players
                            .filter(({ id }) => id !== dialogResponse.player.id)
                            .forEach(player => {
                                this.appointmentResultService.addResult({
                                    ...result,
                                    playerId: player.id,
                                });
                            });
                    } else {
                        this.appointmentResultService.addResult(result);
                    }
                }

                if (dialogResponse.action === PenaltyAction.Remove) {
                    const amount = dialogResponse.penalty.penalty * -1;

                    if (dialogResponse.penalty.inverse) {
                        players
                            .filter(({ id }) => id !== dialogResponse.player.id)
                            .forEach(player => {
                                this.appointmentResultService.addResult({
                                    ...result,
                                    amount,
                                    playerId: player.id,
                                });
                            });
                    } else {
                        this.appointmentResultService.addResult({ ...result, amount });
                    }
                }
            });
    }
}
