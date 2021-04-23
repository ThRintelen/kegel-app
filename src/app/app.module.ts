import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { GamesDetailComponent } from './games/games/detail/detail.component';
import { GamesComponent } from './games/games/games.component';

// TODO Man kann ein Spiel mehr als einmal spielen. Wie wird das optisch dargestellt und kann ich abgeschlossene Spiele korrigieren?

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    GamesComponent,
    GamesDetailComponent,
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
    MatListModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe, 'de-DE');
  }
}
