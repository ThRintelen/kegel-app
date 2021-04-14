import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesDetailComponent } from '../games/games/detail/detail.component';
import { GamesComponent } from '../games/games/games.component';
import { AppointmentsComponent } from './appointments/appointments.component';

// TODO LazyLoading games module
const routes: Routes = [
  { path: '', component: AppointmentsComponent },
  { path: ':appointmentId/games', component: GamesComponent },
  { path: ':appointmentId/games/:gameId', component: GamesDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
