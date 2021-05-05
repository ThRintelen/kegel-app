import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentStoreService } from '../appointments/store.service';
import { PlayersService } from '../player/player.service';

@Component({
  selector: 'app-live-amount',
  templateUrl: './live-amount.component.html',
  styleUrls: ['./live-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveAmountComponent implements OnInit {
  data$!: Observable<{ name: string; amount: number | undefined }[]>;

  constructor(
    private readonly appointmentStoreService: AppointmentStoreService,
    private readonly playersService: PlayersService,
    private readonly route: ActivatedRoute
  ) {}

  // TODO unsubscribe
  // TODO Berchung in einen Servie auslagern

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      switchMap(({ appointmentId }) =>
        this.playersService.getPlayers$(appointmentId)
      ),
      switchMap((players) =>
        this.appointmentStoreService
          .getResults$()
          .pipe(map((results) => ({ results, players })))
      ),
      map(({ results, players }) =>
        // TODO Sortieren nach Betrag
        // TODO Max X Einträge anzeigen
        players.map((player) => {
          const amount = results
            .filter(({ playerId }) => playerId === player.id)
            .map(({ amount }) => amount)
            .reduce((prev, curr) => (prev || 0) + (curr || 0), 0);

          return { name: player.name, amount };
        })
      )
    );
  }
}
