import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Club } from './clubs/club.model';
import { ClubService } from './clubs/club.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    club$: Observable<Club | undefined> = of(undefined);

    constructor(private readonly clubService: ClubService) {}

    ngOnInit() {
        this.club$ = this.clubService.getClub('OXJHCqtm5HOwsTqUNaaU');
        // TODO Woher kommt die ID initial? User?
    }
}
