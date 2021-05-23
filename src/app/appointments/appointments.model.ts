export interface Appointment {
    id: string | null;
    date: string;
    presentMembers: string[];
    playedGames: string[];
    openPaymentAmount: number;
}
