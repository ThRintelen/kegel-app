import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Player } from '../players/player.model';
import { Penalty, PenaltyAction, PenaltyDialogResult } from './penalty.model';
import { PenaltyService } from './penalty.service';

@Component({
    templateUrl: './penalty.component.html',
    styleUrls: ['./penalty.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PenaltyComponent implements OnInit {
    penatlies$: Observable<Penalty[]> = of([]);
    readonly penaltyAction = PenaltyAction;

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly player: Player,
        private readonly dialogRef: MatDialogRef<PenaltyComponent>,
        private readonly penaltyService: PenaltyService,
    ) {}

    ngOnInit() {
        this.penatlies$ = this.penaltyService.getPenalties$();
    }

    onClickButton(penalty: Penalty, player: Player, action: PenaltyAction) {
        const data: PenaltyDialogResult = {
            penalty,
            player,
            action,
        };

        this.dialogRef.close(data);
    }
}
