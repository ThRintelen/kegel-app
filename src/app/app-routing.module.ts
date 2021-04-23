import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { GamesDetailComponent } from './games/games/detail/detail.component';
import { GamesComponent } from './games/games/games.component';

const routes: Routes = [
  {
    path: 'appointments',
    children: [
      { path: '', component: AppointmentsComponent },
      { path: ':appointmentId/games', component: GamesComponent },
      { path: ':appointmentId/games/:gameId', component: GamesDetailComponent },
    ],
  },
  { path: '**', redirectTo: 'appointments' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
