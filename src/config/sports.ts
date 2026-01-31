import type { Slice } from '@reduxjs/toolkit';
import type { Entity, SportType, Theme } from '../types';
import { basketballSlice, footballSlice, tennisSlice } from '../store/store';

type TableHeader = {
  label: string;
  key: keyof Entity | 'name';
};

type HeaderIcon = {
  viewBox: string;
  paths: string[];
};

export type SportConfig = {
  type: SportType;
  title: string;
  headerIcon?: HeaderIcon;
  theme: Theme;
  entityLabel: string;
  entityPlaceholder: string;
  tableHeaders: TableHeader[];
  useModalForms: boolean;
  showMatchResults: boolean;
  showScoreTableTitle: boolean;
  slice: Slice;
  nameMinLength: number;
  nameMaxLength: number;
  scoreMin?: number;
  scoreMax?: number;
};

export const SPORT_CONFIG_MAP: Record<SportType, SportConfig> = {
  football: {
    type: 'football',
    title: 'Premier League',
    nameMinLength: 2,
    nameMaxLength: 24,
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
    scoreMin: 0,
    scoreMax: 20,
  },
  basketball: {
    type: 'basketball',
    title: 'EUROBASKET',
    theme: 'energetic',
    nameMinLength: 2,
    nameMaxLength: 24,
    entityLabel: 'Team',
    entityPlaceholder: 'Country...',
    headerIcon: {
      viewBox: '0 0 24 24',
      paths: [
        'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20z',
        'M12 2v20',
        'M2 12h20',
        'M4.9 4.9c4.6 4.6 4.6 9.6 0 14.2',
        'M19.1 4.9c-4.6 4.6-4.6 9.6 0 14.2',
      ],
    },
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
    scoreMin: 0,
    scoreMax: 200,
  },
  tennis: {
    type: 'tennis',
    title: 'Wimbledon',
    nameMinLength: 2,
    nameMaxLength: 24,
    theme: 'centric',
    entityLabel: 'Player',
    entityPlaceholder: 'Gaubas...',
    headerIcon: {
      viewBox: '0 0 24 24',
      paths: [
        'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20z',
        'M7 4c4 4 4 12 0 16',
        'M17 4c-4 4-4 12 0 16',
      ],
    },
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
