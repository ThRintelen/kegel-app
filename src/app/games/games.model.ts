export interface Game {
  id: string;
  name: string;
  description: string;
  groupGame: boolean; // Gruppenspiel ja/nein
  penalty: number | 'flex'; // Strafgeld für die Verlierer
}
