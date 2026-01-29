import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportValidation } from '../../hooks/useSportValidation';
import type { SportState, SportType } from '../../types/index';
import Table from '../Table/Table';
import styles from './SportCard.module.scss';

interface Props {
  title: string;
  type: SportType;
  theme: 'minimal' | 'energetic' | 'centric';
  slice: any;
}

const SportCard: React.FC<Props> = ({ title, type, theme, slice }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state[type]) as SportState;

  const { error, validateEntity, validateMatch } = useSportValidation(
    data,
    type
  );
  const [newName, setNewName] = useState('');
  const [match, setMatch] = useState({
    homeId: '',
    awayId: '',
    homeScore: 0,
    awayScore: 0,
  });

  const handleAddEntity = () => {
    if (validateEntity(newName)) {
      dispatch(slice.actions.addEntity(newName.trim()));
      setNewName('');
    }
  };

  const handleAddMatch = () => {
    if (validateMatch(match)) {
      dispatch(slice.actions.addMatch(match));
      setMatch({ homeId: '', awayId: '', homeScore: 0, awayScore: 0 });
    }
  };

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <section className={styles.section}>
        <h3>Add {type === 'tennis' ? 'Player' : 'Team'}</h3>
        <div className={styles.inputGroup}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={
              type === 'tennis'
                ? 'Gaubas...'
                : type === 'football'
                  ? 'Liverpool...'
                  : 'Lithuania...'
            }
          />
          <button onClick={handleAddEntity} className={styles.addButton}>
            Add
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Add Score</h3>
        <div className={styles.matchInputs}>
          <div className={styles.selectRow}>
            <select
              value={match.homeId}
              onChange={(e) => setMatch({ ...match, homeId: e.target.value })}
            >
              <option value="">Select Home</option>
              {data.entities.map((e) => (
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
              <option value="">Select Away</option>
              {data.entities.map((e) => (
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
            onClick={handleAddMatch}
            className={styles.scoreButton}
            disabled={!match.homeId || !match.awayId}
          >
            Confirm Result
          </button>
        </div>
      </section>

      <Table type={type} entities={data.entities} />
    </div>
  );
};

export default SportCard;
