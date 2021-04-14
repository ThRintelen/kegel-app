import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  { path: '**', redirectTo: 'appointments' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
