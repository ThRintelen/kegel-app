import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../games.model';
import { GamesService } from '../games.service';

// TODO Gespielte Spiele markieren mit Anzahl wie oft
// TODO 2. Spiel muss möglich sein.

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit {
  games$!: Observable<Game[]>;

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit() {
    this.games$ = this.gamesService.getGames$();
  }
}
