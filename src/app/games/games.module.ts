import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, GamesRoutingModule, MatCardModule, MatButtonModule],
})
export class GamesModule {}
