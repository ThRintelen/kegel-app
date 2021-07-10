import { Game } from '../games/games.model';

export interface Club {
    id: string;
    name?: string;
}

export interface ClubData {
    club: Club;
    games: Game[];
}
