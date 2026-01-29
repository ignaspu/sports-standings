import { useState, useEffect } from 'react';
import type { SportState, SportType, Match } from '../types';

export const useSportValidation = (data: SportState, type: SportType) => {
  const [error, setError] = useState<string | null>(null);

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
      setError(`${type === 'tennis' ? 'Player' : 'Team'} already exists.`);
      return false;
    }
    return true;
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
    if (type === 'tennis' && homeScore === awayScore) {
      setError('Tennis matches must have a winner.');
      return false;
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
