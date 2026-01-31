import React, { useState } from 'react';
import type { Entity } from '../../types/index';
import styles from './Forms.module.scss';
import classnames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';

interface MatchFormProps {
  entities: Entity[];
  onSubmit: (match: {
    homeId: string;
    awayId: string;
    homeScore: number;
    awayScore: number;
  }) => void;
  compact?: boolean;
}

const MatchForm: React.FC<MatchFormProps> = ({
  entities,
  onSubmit,
  compact = false,
}) => {
  const { type, theme } = useSportCardContext();
  const { entityLabel, scoreMin, scoreMax } = getSportConfig(type);
  const [match, setMatch] = useState({
    homeId: '',
    awayId: '',
    homeScore: '' as number | '',
    awayScore: '' as number | '',
  });

  const hasScoreRange =
    typeof scoreMin === 'number' && typeof scoreMax === 'number';

  const isScoreInRange = (score: number | '') => {
    if (!hasScoreRange || score === '') return true;
    return score >= scoreMin && score <= scoreMax;
  };

  const handleScoreChange = (field: 'homeScore' | 'awayScore') => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? '' : Number(event.target.value);
      setMatch((prev) => ({ ...prev, [field]: value }));
    };
  };

  const showScoreHelper =
    hasScoreRange &&
    ((match.homeScore !== '' && !isScoreInRange(match.homeScore)) ||
      (match.awayScore !== '' && !isScoreInRange(match.awayScore)));

  const handleConfirm = () => {
    onSubmit({
      ...match,
      homeScore: Number(match.homeScore || 0),
      awayScore: Number(match.awayScore || 0),
    });

    setMatch({ homeId: '', awayId: '', homeScore: '', awayScore: '' });
  };

  const isInvalid =
    !match.homeId ||
    !match.awayId ||
    match.homeId === match.awayId ||
    !isScoreInRange(match.homeScore) ||
    !isScoreInRange(match.awayScore);

  return (
    <section
      className={classnames(styles.match, styles[theme], {
        [styles.compact]: compact,
      })}
    >
      <div className={styles.matchForm}>
        {!compact && <h3>Add Score</h3>}
        <div className={styles.matchInputs}>
          <div className={styles.selectRow}>
            <select
              value={match.homeId}
              onChange={(e) => setMatch({ ...match, homeId: e.target.value })}
            >
              <option value="">Home {compact ? '' : entityLabel}</option>
              {entities.map((e) => (
                <option
                  key={e.id}
                  value={e.id}
                  disabled={e.id === match.awayId}
                >
                  {e.name}
                </option>
              ))}
            </select>

            <select
              value={match.awayId}
              onChange={(e) => setMatch({ ...match, awayId: e.target.value })}
            >
              <option value="">Away {compact ? '' : entityLabel}</option>
              {entities.map((e) => (
                <option
                  key={e.id}
                  value={e.id}
                  disabled={e.id === match.homeId}
                >
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.scoreRow}>
            <input
              type="number"
              placeholder="Home Score"
              min={hasScoreRange ? scoreMin : 0}
              max={hasScoreRange ? scoreMax : undefined}
              value={match.homeScore}
              onChange={handleScoreChange('homeScore')}
            />

            <input
              type="number"
              min={hasScoreRange ? scoreMin : 0}
              max={hasScoreRange ? scoreMax : undefined}
              placeholder="Away Score"
              value={match.awayScore}
              onChange={handleScoreChange('awayScore')}
            />
          </div>

          <button
            onClick={handleConfirm}
            className={styles.scoreButton}
            disabled={isInvalid}
          >
            Add Score
          </button>
        </div>
        {showScoreHelper && (
          <p className={styles.helper}>
            Scores must be between {scoreMin} and {scoreMax}.
          </p>
        )}
      </div>
    </section>
  );
};

export default MatchForm;
