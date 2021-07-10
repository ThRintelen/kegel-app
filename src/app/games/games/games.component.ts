import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppointmentsService } from 'src/app/appointments/appointments.service';
import { PlayersService } from 'src/app/players/player.service';
import { Game, PenaltyType } from '../games.model';
import { GamesService } from '../games.service';

@Component({
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit {
    readonly penaltyType = PenaltyType;
    data$: Observable<Game[] | null> | undefined = of([]);

    constructor(
        private readonly gamesService: GamesService,
        private readonly plyerService: PlayersService,
        private readonly appointmentsService: AppointmentsService,
        private readonly route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.data$ = this.route.parent?.params.pipe(
            tap(() => this.appointmentsService.resetAppointment()),
            switchMap(({ appointmentId }) => this.appointmentsService.getAppointment$(appointmentId)),
            switchMap(appointment => this.gamesService.getGames$().pipe(map(game => ({ game, appointment })))),
            switchMap(({ game, appointment }) =>
                this.plyerService.getPresentPlayers$(appointment?.presentMembers).pipe(map(() => game)),
            ),
        );
    }
}
