import React from 'react';
import type { Entity } from '../../types/index';
import styles from './Tables.module.scss';
import { useSportCardContext } from '../../context/useSportCardContext';
import { countryOptions } from '../../data/countries';
import ReactCountryFlag from 'react-country-flag';

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
  const { type } = useSportCardContext();
  const maxVisibleRows = type === 'basketball' ? 2 : 4;

  const countryCodeMap = new Map(
    countryOptions.map((option) => [option.country, option.code])
  );

  const getEntityName = (id: string) =>
    entities.find((e) => e.id === id)?.name || 'Unknown';

  const getEntityLabel = (id: string) => {
    const name = getEntityName(id);
    const code = type === 'basketball' ? countryCodeMap.get(name) : null;

    return code ? (
      <span className={styles.label}>
        <ReactCountryFlag
          countryCode={code}
          svg
          className={styles.flag}
          aria-label={name}
          title={name}
        />
        <span className={styles.name}>{name}</span>
      </span>
    ) : (
      name
    );
  };

  if (!matches || matches.length === 0) return null;

  return (
    <div
      className={styles.resultsContainer}
      style={{ '--result-max-rows': maxVisibleRows } as React.CSSProperties}
    >
      {[...matches].reverse().map((match, index) => (
        <div key={index} className={styles.matchRow}>
          <span className={styles.teams}>
            {getEntityLabel(match.homeId)} <span className={styles.vs}>vs</span>{' '}
            {getEntityLabel(match.awayId)}
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
