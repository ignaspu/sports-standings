import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportValidation } from '../../hooks/useSportValidation';
import type { SportState, SportType } from '../../types/index';
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
  const sortedEntities = [...data.entities].sort((a, b) => b.points - a.points);

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

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.nameCol}>
                {type === 'tennis' ? 'Player' : 'Team'}
              </th>

              {type !== 'basketball' && (
                <th>{type === 'tennis' ? 'M' : 'P'}</th>
              )}

              <th>W</th>

              {type === 'basketball' ? (
                <>
                  <th>L</th>
                  <th>D</th>
                </>
              ) : (
                <>
                  {type !== 'tennis' && <th>D</th>}
                  <th>L</th>
                </>
              )}

              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntities.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No data available
                </td>
              </tr>
            ) : (
              sortedEntities.map((entity) => (
                <tr key={entity.id}>
                  <td className={styles.nameCol}>{entity.name}</td>

                  {type !== 'basketball' && <td>{entity.played}</td>}

                  <td>{entity.wins}</td>

                  {type === 'basketball' ? (
                    <>
                      <td>{entity.losses}</td>
                      <td>{entity.draws}</td>
                    </>
                  ) : (
                    <>
                      {type !== 'tennis' && <td>{entity.draws}</td>}
                      <td>{entity.losses}</td>
                    </>
                  )}

                  <td className={styles.pts}>
                    <strong>{entity.points}</strong>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SportCard;
