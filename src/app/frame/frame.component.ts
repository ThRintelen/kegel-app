import { ChangeDetectionStrategy, Component } from '@angular/core';

// TODO Mobiles Verhalten der Sidenav!

// TODO Frame > liegt unterhalb von appointments, weil das ein appointment ist
// TODO Wenn ich im Frame lande, also in einem Termin, dann...
// TODO ...lade ich den Termin und speicher ihn im Service
// TODO ...lade ich die anwesenden Spieler und speicher sie im Service
// TODO ...lade ich die anwesenden Spieler und speicher sie im Service
// TODO ...wenn sich die ID ändern, dann resete den Service und lade neu

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameComponent {}
