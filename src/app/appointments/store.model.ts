export enum AppointmentResultType {
  Game = 'game',
  Penalty = 'penalty',
}

export interface AppointmentResult {
  appointmentId: string;
  id: string; // ID des Spiels oder der Strafe
  type: AppointmentResultType;
  playerId: string;
  amount?: number;
  points?: number;
}
