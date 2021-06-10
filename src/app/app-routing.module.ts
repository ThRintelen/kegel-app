import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { FrameComponent } from './frame/frame.component';
import { GamesDetailComponent } from './games/games/detail/detail.component';
import { GamesComponent } from './games/games/games.component';

const routes: Routes = [
    {
        path: 'appointments',
        children: [
            { path: '', component: AppointmentsComponent },
            {
                path: ':appointmentId',
                component: FrameComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'games',
                    },
                    {
                        path: 'games',
                        component: GamesComponent,
                    },
                    {
                        path: 'games/:gameId',
                        component: GamesDetailComponent,
                    },
                ],
            },
        ],
    },
    { path: '**', redirectTo: 'appointments' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
