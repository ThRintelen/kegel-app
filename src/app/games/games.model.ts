export interface Game {
    id: string;
    name: string;
    description: string;
    groupGame: boolean;
    penalty: number | PenaltyType;
}

export enum PenaltyType {
    Flex = 'flex',
}
