export interface Game {
  id: string;
  name: string;
  description: string;
  groupGame: boolean; // Gruppenspiel ja/nein
  penalty: number | PenaltyType; // Strafgeld für die Verlierer
}

export enum PenaltyType {
  Flex = 'flex',
}
