import type { Slice } from '@reduxjs/toolkit';
import type { Entity, SportType, Theme } from '../types';
import { basketballSlice, footballSlice, tennisSlice } from '../store/store';

type TableHeader = {
  label: string;
  key: keyof Entity | 'name';
};

export type SportConfig = {
  type: SportType;
  title: string;
  theme: Theme;
  entityLabel: string;
  entityPlaceholder: string;
  tableHeaders: TableHeader[];
  useModalForms: boolean;
  showMatchResults: boolean;
  showScoreTableTitle: boolean;
  slice: Slice;
};

export const SPORT_CONFIG_MAP: Record<SportType, SportConfig> = {
  football: {
    type: 'football',
    title: 'Premier League',
    theme: 'minimal',
    entityLabel: 'Team',
    entityPlaceholder: 'Liverpool...',
    tableHeaders: [
      { label: 'Team', key: 'name' },
      { label: 'P', key: 'played' },
      { label: 'W', key: 'wins' },
      { label: 'D', key: 'draws' },
      { label: 'L', key: 'losses' },
      { label: 'Pts', key: 'points' },
    ],
    useModalForms: false,
    showMatchResults: false,
    showScoreTableTitle: false,
    slice: footballSlice,
  },
  basketball: {
    type: 'basketball',
    title: 'EUROBASKET',
    theme: 'energetic',
    entityLabel: 'Team',
    entityPlaceholder: 'Lithuania...',
    tableHeaders: [
      { label: 'Team', key: 'name' },
      { label: 'W', key: 'wins' },
      { label: 'L', key: 'losses' },
      { label: 'D', key: 'draws' },
      { label: 'Pts', key: 'points' },
    ],
    useModalForms: true,
    showMatchResults: true,
    showScoreTableTitle: true,
    slice: basketballSlice,
  },
  tennis: {
    type: 'tennis',
    title: 'Wimbledon',
    theme: 'centric',
    entityLabel: 'Player',
    entityPlaceholder: 'Gaubas...',
    tableHeaders: [
      { label: 'Player', key: 'name' },
      { label: 'M', key: 'played' },
      { label: 'W', key: 'wins' },
      { label: 'L', key: 'losses' },
      { label: 'Pts', key: 'points' },
    ],
    useModalForms: true,
    showMatchResults: false,
    showScoreTableTitle: false,
    slice: tennisSlice,
  },
};

export const SPORT_CONFIGS: SportConfig[] = [
  SPORT_CONFIG_MAP.football,
  SPORT_CONFIG_MAP.basketball,
  SPORT_CONFIG_MAP.tennis,
];

export const getSportConfig = (type: SportType): SportConfig =>
  SPORT_CONFIG_MAP[type];
