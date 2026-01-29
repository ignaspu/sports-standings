import React from 'react';
import { useDispatch } from 'react-redux';
import { useSportValidation } from '../../hooks/useSportValidation';
import { useSportModal } from '../../hooks/useSportModal';
import type { SportType } from '../../types/index';
import Table from '../Tables/Table';
import styles from './Cards.module.scss';
import EntityForm from '../Forms/EntityForm';
import MatchForm from '../Forms/MatchForm';
import MatchResults from '../Tables/MatchResults';
import { useSportData } from '../../hooks/useSportData';
import ModalButtons from '../Buttons/ModalButtons';
import SportModal from '../Modals/SportModal';

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
    if (validateEntity(name)) {
      dispatch(slice.actions.addEntity(name));
    }
  };

  const onAddMatch = (matchData: any) => {
    if (validateMatch(matchData)) {
      dispatch(slice.actions.addMatch(matchData));
    }
  };

  const {
    modalState,
    openEntityModal,
    openMatchModal,
    closeModal,
    handleSubmit,
    useModalForms,
  } = useSportModal({
    type,
    onAddEntity,
    onAddMatch,
  });

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>

      <div className={styles.content}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {useModalForms ? (
          <ModalButtons
            onAddEntity={openEntityModal}
            onAddMatch={openMatchModal}
            theme={theme}
            type={type}
          />
        ) : (
          <>
            <EntityForm type={type} theme={theme} onSubmit={onAddEntity} />
            <MatchForm
              type={type}
              entities={data.entities}
              theme={theme}
              onSubmit={onAddMatch}
            />
          </>
        )}

        {type === 'basketball' && (
          <MatchResults matches={data.matches} entities={data.entities} />
        )}

        {type === 'basketball' && (
          <h3 className={styles.tableTitle}>Score Table:</h3>
        )}

        <Table type={type} theme={theme} entities={data.entities} />
      </div>

      <SportModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        theme={theme}
        type={type}
        modalType={modalState.modalType as 'entity' | 'match'}
        entities={modalState.modalType === 'match' ? data.entities : []}
      />
    </div>
  );
};

export default SportCard;
