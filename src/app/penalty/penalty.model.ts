import { Player } from '../player/player.model';

export interface Penalty {
  id: string;
  name: string;
  description: string;
  penalty: number;
  inverse: boolean;
}

export interface PenaltyDialogResult {
  penalty: Penalty;
  player: Player;
  action: PenaltyAction;
}

export enum PenaltyAction {
  Add = 'add',
  Remove = 'remove',
}
