import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { GamesDetailComponent } from './games/games/detail/detail.component';
import { GamesComponent } from './games/games/games.component';
import { LiveAmountComponent } from './live-amount/live-amount.component';
import { PenaltyComponent } from './penalty/penalty.component';

// TODO Man kann ein Spiel mehr als einmal spielen. Wie wird das optisch dargestellt und kann ich abgeschlossene Spiele korrigieren?

@NgModule({
    declarations: [
        AppComponent,
        AppointmentsComponent,
        GamesComponent,
        GamesDetailComponent,
        LiveAmountComponent,
        PenaltyComponent,
        CreateAppointmentComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatSidenavModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        registerLocaleData(localeDe, 'de-DE');
    }
}
