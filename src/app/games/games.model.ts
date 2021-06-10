export interface Game {
    id: string;
    name: string;
    description: string;
    groupGame: boolean;
    penalty: number | PenaltyType;
    icon?: string;
}

export enum PenaltyType {
    Flex = 'flex',
}
