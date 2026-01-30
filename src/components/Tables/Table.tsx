import React from 'react';
import type { Entity } from '../../types/index';
import styles from './Tables.module.scss';
import classNames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';

interface TableProps {
  entities: Entity[];
}

const Table: React.FC<TableProps> = ({ entities }) => {
  const { type, theme } = useSportCardContext();
  const { tableHeaders } = getSportConfig(type);
  const sortedEntities = [...entities].sort((a, b) => b.points - a.points);

  const renderEmptyState = () => (
    <tr>
      <td colSpan={tableHeaders.length} className={styles.empty}>
        No data available
      </td>
    </tr>
  );

  const renderEntityRow = (entity: Entity) => {
    return (
      <tr key={entity.id}>
        {tableHeaders.map((header) => {
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
            {tableHeaders.map((header) => (
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
