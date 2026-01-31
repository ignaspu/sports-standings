import { useState, useEffect } from 'react';
import type { SportState, SportType, Match } from '../types';
import { getSportConfig } from '../config/sports';

export const useSportValidation = (data: SportState, type: SportType) => {
  const [error, setError] = useState<string | null>(null);
  const { entityLabel } = getSportConfig(type);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateEntity = (name: string): boolean => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a valid name.');
      return false;
    }
    const exists = data.entities.some(
      (e) => e.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError(`${entityLabel} already exists.`);
      return false;
    }
    return true;
  };

  const isValidTennisScore = (homeSets: number, awaySets: number) => {
    if (!Number.isInteger(homeSets) || !Number.isInteger(awaySets))
      return false;
    if (homeSets < 0 || awaySets < 0) return false;

    if (homeSets === awaySets) return false;

    const maxSets = Math.max(homeSets, awaySets);
    const minSets = Math.min(homeSets, awaySets);

    if (maxSets === 2 && (minSets === 0 || minSets === 1)) return true;
    if (maxSets === 3 && (minSets === 0 || minSets === 1 || minSets === 2))
      return true;

    return false;
  };

  const validateMatch = (match: Omit<Match, 'id'>): boolean => {
    const { homeId, awayId, homeScore, awayScore } = match;

    if (!homeId || !awayId) {
      setError('Please select both opponents.');
      return false;
    }
    if (homeId === awayId) {
      setError('An opponent cannot play against themselves.');
      return false;
    }
    if (type === 'tennis') {
      if (homeScore === awayScore) {
        setError('Tennis matches must have a winner.');
        return false;
      }

      if (!isValidTennisScore(homeScore, awayScore)) {
        setError('Use a valid tennis match score: 2-0, 2-1 or 3-0, 3-1, 3-2.');
        return false;
      }
    }

    const matchExists = data.matches.some(
      (m) =>
        (m.homeId === homeId && m.awayId === awayId) ||
        (m.homeId === awayId && m.awayId === homeId)
    );
    if (matchExists) {
      setError('These opponents have already played.');
      return false;
    }

    return true;
  };

  return { error, setError, validateEntity, validateMatch };
};
