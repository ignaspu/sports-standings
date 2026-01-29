import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SportState, Match, Entity } from '../types/index';

const initialState: SportState = {
  entities: [],
  matches: [],
};

export const createSportSlice = (name: string) =>
  createSlice({
    name,
    initialState,
    reducers: {
      addEntity: (state, action: PayloadAction<string>) => {
        const newEntity: Entity = {
          id: crypto.randomUUID(),
          name: action.payload,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          points: 0,
        };
        state.entities.push(newEntity);
      },
      addMatch: (state, action: PayloadAction<Omit<Match, 'id'>>) => {
        const { homeId, awayId, homeScore, awayScore } = action.payload;

        if (name === 'tennis' && homeScore === awayScore) {
          return;
        }

        const existing = state.matches.find(
          (m) =>
            (m.homeId === homeId && m.awayId === awayId) ||
            (m.homeId === awayId && m.awayId === homeId)
        );
        if (existing) return;

        state.matches.push({ id: crypto.randomUUID(), ...action.payload });

        const home = state.entities.find((e) => e.id === homeId);
        const away = state.entities.find((e) => e.id === awayId);

        if (home && away) {
          home.played += 1;
          away.played += 1;

          if (homeScore > awayScore) {
            home.wins += 1;
            home.points += 3;
            away.losses += 1;
          } else if (awayScore > homeScore) {
            away.wins += 1;
            away.points += 3;
            home.losses += 1;
          } else {
            home.draws += 1;
            home.points += 1;
            away.draws += 1;
            away.points += 1;
          }
        }
      },
    },
  });
