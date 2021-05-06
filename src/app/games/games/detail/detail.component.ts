import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppointmentResultType } from 'src/app/appointments/store.model';
import { AppointmentStoreService } from 'src/app/appointments/store.service';
import { Player } from '../../..//player/player.model';
import { PlayersService } from '../../../player/player.service';
import { Game, PenaltyType } from '../../games.model';
import { GamesService } from '../../games.service';

// TODO Seite optisch aufbereiten
// TODO Validierungen
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
    private readonly appointmentStoreService: AppointmentStoreService
  ) {}

  ngOnInit() {
    const players$ = this.route.params.pipe(
      switchMap(({ appointmentId }) =>
        this.playersService.getPlayers$(appointmentId)
      ),
      tap((players) => {
        players.forEach((player) => {
          const field = new FormControl('');
          this.form.addControl(player.id, field);
        });
      })
    );

    const game$ = this.route.params.pipe(
      switchMap(({ gameId }) => this.gamesService.getGame$(gameId))
    );

    this.data$ = zip(players$, game$).pipe(
      map((data) => ({ game: data[1], players: data[0] }))
    );
  }

  onClickSubmit(game: Game, players: Player[]) {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(({ appointmentId }) => {
        players.forEach((player) => {
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
}
