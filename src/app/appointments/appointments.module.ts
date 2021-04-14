import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GamesModule } from '../games/games.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    GamesModule,
  ],
})
export class AppointmentsModule {}
