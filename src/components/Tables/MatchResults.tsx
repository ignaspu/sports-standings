import React from 'react';
import type { Entity } from '../../types/index';
import styles from './Tables.module.scss';

interface Match {
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
}

interface MatchResultsProps {
  matches: Match[];
  entities: Entity[];
}

const MatchResults: React.FC<MatchResultsProps> = ({ matches, entities }) => {
  const getEntityName = (id: string) =>
    entities.find((e) => e.id === id)?.name || 'Unknown';

  if (!matches || matches.length === 0) return null;

  return (
    <div className={styles.resultsContainer}>
      {matches.map((match, index) => (
        <div key={index} className={styles.matchRow}>
          <span className={styles.teams}>
            {getEntityName(match.homeId)} <span className={styles.vs}>vs</span>{' '}
            {getEntityName(match.awayId)}
          </span>
          <span className={styles.score}>
            {match.homeScore}-{match.awayScore}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
