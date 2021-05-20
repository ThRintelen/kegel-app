import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentResultType } from 'src/app/appointments/store.model';
import { AppointmentStoreService } from '../../appointments/store.service';
import { Game, PenaltyType } from '../games.model';
import { GamesService } from '../games.service';

type GamesPlayed = (Game & { played: boolean })[];

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit {
  readonly penaltyType = PenaltyType;
  data$!: Observable<GamesPlayed>;

  constructor(
    private readonly gamesService: GamesService,
    private readonly appointmentStoreService: AppointmentStoreService
  ) {}

  ngOnInit() {
    this.data$ = this.appointmentStoreService.getResults$().pipe(
      switchMap((store) =>
        this.gamesService.getGames$().pipe(map((games) => ({ games, store })))
      ),
      map(({ games, store }) =>
        games.map((game) => ({
          ...game,
          played: store.some(
            (entry) =>
              entry.type === AppointmentResultType.Game && entry.id === game.id
          ),
        }))
      )
    );
  }
}
