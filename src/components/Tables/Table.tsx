import React from 'react';
import type { Entity } from '../../types/index';
import styles from './Tables.module.scss';
import classNames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';
import { countryOptions } from '../../data/countries';
import ReactCountryFlag from 'react-country-flag';

interface TableProps {
  entities: Entity[];
}

const Table: React.FC<TableProps> = ({ entities }) => {
  const { type, theme } = useSportCardContext();
  const { tableHeaders } = getSportConfig(type);
  const sortedEntities = [...entities].sort((a, b) => b.points - a.points);
  const maxVisibleRows = type === 'tennis' ? 8 : type === 'basketball' ? 6 : 4;

  const countryCodeMap = React.useMemo(
    () => new Map(countryOptions.map(({ country, code }) => [country, code])),
    []
  );

  const renderEmptyState = () => (
    <tr>
      <td colSpan={tableHeaders.length} className={styles.empty}>
        No data available
      </td>
    </tr>
  );

  const renderNameCell = (name: string) => {
    if (type !== 'basketball') return name;

    const code = countryCodeMap.get(name);
    if (!code) return name;

    return (
      <span className={styles.label}>
        <ReactCountryFlag
          countryCode={code}
          svg
          className={styles.flag}
          title={name}
          aria-label={name}
        />
        <span>{name}</span>
      </span>
    );
  };

  const renderTennisStat = (
    value: number,
    variant: 'win' | 'loss'
  ): React.ReactNode => (
    <span className={styles.statWithIcon}>
      <span>{value}</span>
      <span
        className={variant === 'win' ? styles.winIcon : styles.lossIcon}
        aria-hidden="true"
      >
        {variant === 'win' ? '✓' : '✕'}
      </span>
    </span>
  );

  const renderCellContent = (
    entity: Entity,
    headerKey: keyof Entity | 'name'
  ) => {
    if (headerKey === 'name') {
      return renderNameCell(entity.name);
    }

    if (headerKey === 'points') {
      return <strong>{entity.points}</strong>;
    }

    if (type === 'tennis' && headerKey === 'wins') {
      return renderTennisStat(entity.wins, 'win');
    }

    if (type === 'tennis' && headerKey === 'losses') {
      return renderTennisStat(entity.losses, 'loss');
    }

    return entity[headerKey as keyof Omit<Entity, 'id' | 'name'>];
  };

  const renderEntityRow = (entity: Entity) => {
    return (
      <tr key={entity.id}>
        {tableHeaders.map((header) => {
          const cellContent = renderCellContent(entity, header.key);

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
      <div
        className={styles.tableScroll}
        style={{ '--table-max-rows': maxVisibleRows } as React.CSSProperties}
      >
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
    </div>
  );
};

export default Table;
