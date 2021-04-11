export interface Appointment {
  id: string;
  date: string;
  presentMembers: string[]; // TODO IDs der Spieler
  playedGames: string[]; // TODO IDs der Spiele
  openPaymentAmount: number;
}
