import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { GamesDetailComponent } from './games/detail/detail.component';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [GamesComponent, GamesDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
  ],
})
export class GamesModule {}
