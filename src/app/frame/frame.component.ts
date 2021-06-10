import { ChangeDetectionStrategy, Component } from '@angular/core';

// TODO Mobiles Verhalten der Sidenav!

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameComponent {}
