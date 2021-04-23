import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppointmentResultType } from 'src/app/appointments/store.model';
import { AppointmentStoreService } from 'src/app/appointments/store.service';
import { Player } from '../../..//player/player.model';
import { PlayersService } from '../../../player/player.service';
import { Game } from '../../games.model';
import { GamesService } from '../../games.service';

// TODO unsubscribe
// TODO Seite optisch aufbereiten
// TODO flex Type bauen (Lotto)

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesDetailComponent implements OnInit {
  data$!: Observable<[Player[], Game]>;

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
      )
    );

    const game$ = this.route.params.pipe(
      switchMap(({ gameId }) => this.gamesService.getGame$(gameId))
    );

    this.data$ = zip(players$, game$);
  }

  onClickSubmit(players: MatSelectionList, game: Game) {
    this.route.params.subscribe(({ gameId, appointmentId }) => {
      players.selectedOptions.selected.forEach(({ value }) => {
        this.appointmentStoreService.addResult({
          id: gameId,
          type: AppointmentResultType.Game,
          playerId: value.id,
          amount: game.penalty === 'flex' ? 0 : game.penalty,
        });
      });

      this.router.navigate(['/appointments', appointmentId, 'games']);
    });
  }
}
