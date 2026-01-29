import React, { useState } from 'react';
import type { Entity, SportType } from '../../types/index';
import styles from './Forms.module.scss';

interface MatchFormProps {
  type: SportType;
  entities: Entity[];
  onSubmit: (match: {
    homeId: string;
    awayId: string;
    homeScore: number;
    awayScore: number;
  }) => void;
}

const MatchForm: React.FC<MatchFormProps> = ({ entities, onSubmit }) => {
  const [match, setMatch] = useState({
    homeId: '',
    awayId: '',
    homeScore: 0,
    awayScore: 0,
  });

  const handleConfirm = () => {
    onSubmit(match);
    setMatch({ homeId: '', awayId: '', homeScore: 0, awayScore: 0 });
  };

  const isInvalid = !match.homeId || !match.awayId;

  return (
    <section className={styles.section}>
      <h3>Add Score</h3>
      <div className={styles.matchInputs}>
        <div className={styles.selectRow}>
          <select
            value={match.homeId}
            onChange={(e) => setMatch({ ...match, homeId: e.target.value })}
          >
            <option value="">Select Home</option>
            {entities.map((e) => (
              <option key={e.id} value={e.id} disabled={e.id === match.awayId}>
                {e.name}
              </option>
            ))}
          </select>

          <select
            value={match.awayId}
            onChange={(e) => setMatch({ ...match, awayId: e.target.value })}
          >
            <option value="">Select Away</option>
            {entities.map((e) => (
              <option key={e.id} value={e.id} disabled={e.id === match.homeId}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.scoreRow}>
          <input
            type="number"
            min="0"
            value={match.homeScore}
            onChange={(e) =>
              setMatch({
                ...match,
                homeScore: Math.max(0, Number(e.target.value)),
              })
            }
          />
          <span className={styles.vs}>VS</span>
          <input
            type="number"
            min="0"
            value={match.awayScore}
            onChange={(e) =>
              setMatch({
                ...match,
                awayScore: Math.max(0, Number(e.target.value)),
              })
            }
          />
        </div>

        <button
          onClick={handleConfirm}
          className={styles.scoreButton}
          disabled={isInvalid}
        >
          Confirm Result
        </button>
      </div>
    </section>
  );
};

export default MatchForm;
