import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClubData } from './clubs/club.model';
import { ClubService } from './clubs/club.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    data$: Observable<ClubData | null> = of(null);

    constructor(private readonly clubService: ClubService) {}

    ngOnInit() {
        this.clubService.resteClub();
        this.data$ = this.clubService.getClub$('OXJHCqtm5HOwsTqUNaaU');
        // TODO Woher kommt die ID initial? User?
    }
}
