import React from 'react';
import { useDispatch } from 'react-redux';
import { useSportValidation } from '../../hooks/useSportValidation';
import type { SportType } from '../../types/index';
import Table from '../Tables/Table';
import styles from './Cards.module.scss';
import EntityForm from '../Forms/EntityForm';
import MatchForm from '../Forms/MatchForm';
import { useSportData } from '../../hooks/useSportData';

interface Props {
  title: string;
  type: SportType;
  theme: 'minimal' | 'energetic' | 'centric';
  slice: any;
}

const SportCard: React.FC<Props> = ({ title, type, theme, slice }) => {
  const data = useSportData(type);
  const { error, validateEntity, validateMatch } = useSportValidation(
    data,
    type
  );
  const dispatch = useDispatch();

  const onAddEntity = (name: string) => {
    if (validateEntity(name)) dispatch(slice.actions.addEntity(name));
  };

  const onAddMatch = (matchData: any) => {
    if (validateMatch(matchData)) dispatch(slice.actions.addMatch(matchData));
  };

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <EntityForm type={type} onSubmit={onAddEntity} />

      <MatchForm type={type} entities={data.entities} onSubmit={onAddMatch} />

      <Table type={type} entities={data.entities} />
    </div>
  );
};

export default SportCard;
