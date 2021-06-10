import { Timestamp } from '@firebase/firestore-types';

export interface Appointment {
    id: string;
    date: Timestamp;
    presentMembers: string[];
    openPaymentAmount: number;
    clubId: string;
}

export interface CreateAppointmentData {
    presentMembers: string[];
    date: Timestamp;
}
