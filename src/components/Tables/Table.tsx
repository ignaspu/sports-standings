import React from 'react';
import type { Entity, SportType } from '../../types/index';
import styles from './Tables.module.scss';
import classNames from 'classnames';

interface TableProps {
  type: SportType;
  entities: Entity[];
  theme: 'minimal' | 'energetic' | 'centric';
}

const TABLE_HEADERS: Record<
  SportType,
  { label: string; key: keyof Entity | 'name' }[]
> = {
  football: [
    { label: 'Team', key: 'name' },
    { label: 'P', key: 'played' },
    { label: 'W', key: 'wins' },
    { label: 'D', key: 'draws' },
    { label: 'L', key: 'losses' },
    { label: 'Pts', key: 'points' },
  ],
  basketball: [
    { label: 'Team', key: 'name' },
    { label: 'W', key: 'wins' },
    { label: 'L', key: 'losses' },
    { label: 'D', key: 'draws' },
    { label: 'Pts', key: 'points' },
  ],
  tennis: [
    { label: 'Player', key: 'name' },
    { label: 'M', key: 'played' },
    { label: 'W', key: 'wins' },
    { label: 'L', key: 'losses' },
    { label: 'Pts', key: 'points' },
  ],
};

const Table: React.FC<TableProps> = ({ type, entities, theme }) => {
  const sortedEntities = [...entities].sort((a, b) => b.points - a.points);

  const renderEmptyState = () => (
    <tr>
      <td colSpan={TABLE_HEADERS[type].length} className={styles.empty}>
        No data available
      </td>
    </tr>
  );

  const renderEntityRow = (entity: Entity) => {
    const headers = TABLE_HEADERS[type];

    return (
      <tr key={entity.id}>
        {headers.map((header) => {
          const cellContent =
            header.key === 'name' ? (
              entity.name
            ) : header.key === 'points' ? (
              <strong>{entity[header.key]}</strong>
            ) : (
              entity[header.key as keyof Omit<Entity, 'id' | 'name'>]
            );

          const cellClassName =
            header.key === 'name'
              ? styles.nameCol
              : header.key === 'points'
                ? styles.pts
                : '';

          return (
            <td key={header.key} className={cellClassName}>
              {cellContent}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className={classNames(styles.tableContainer, styles[theme])}>
      <table className={styles.table}>
        <thead>
          <tr>
            {TABLE_HEADERS[type].map((header) => (
              <th
                key={header.key}
                className={header.key === 'name' ? styles.nameCol : ''}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedEntities.length === 0
            ? renderEmptyState()
            : sortedEntities.map(renderEntityRow)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
