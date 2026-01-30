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
  const { entityLabel } = getSportConfig(type);
  const [match, setMatch] = useState({
    homeId: '',
    awayId: '',
    homeScore: '' as number | '',
    awayScore: '' as number | '',
  });

  const handleConfirm = () => {
    onSubmit({
      ...match,
      homeScore: Number(match.homeScore || 0),
      awayScore: Number(match.awayScore || 0),
    });

    setMatch({ homeId: '', awayId: '', homeScore: '', awayScore: '' });
  };

  const isInvalid =
    !match.homeId || !match.awayId || match.homeId === match.awayId;

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
              min="0"
              value={match.homeScore}
              onChange={(e) =>
                setMatch({
                  ...match,
                  homeScore:
                    e.target.value === '' ? '' : Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              min="0"
              placeholder="Away Score"
              value={match.awayScore}
              onChange={(e) =>
                setMatch({
                  ...match,
                  awayScore:
                    e.target.value === '' ? '' : Number(e.target.value),
                })
              }
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
      </div>
    </section>
  );
};

export default MatchForm;
