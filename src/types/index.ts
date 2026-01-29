export type SportType = 'football' | 'basketball' | 'tennis';

export interface Entity {
  id: string;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
}

export interface SportState {
  entities: Entity[];
  matches: Match[];
}

export interface RootState {
  football: SportState;
  basketball: SportState;
  tennis: SportState;
}
