import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Player } from '../../players/player.model';
import { Appointment } from '../appointments.model';

@Component({
    templateUrl: './create-appointment.component.html',
    styleUrls: ['./create-appointment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointmentComponent {
    date = new FormControl('', Validators.required);

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly players$: Observable<Player[]>,
        private readonly dialogRef: MatDialogRef<CreateAppointmentComponent>,
    ) {}

    onClickCreate(selectedPlayers: MatSelectionList) {
        const appointment: Appointment = {
            id: null,
            date: this.date.value,
            presentMembers: selectedPlayers.selectedOptions.selected.map(({ value }) => value),
            playedGames: [],
            openPaymentAmount: 0,
        };

        this.dialogRef.close(appointment);
    }
}
