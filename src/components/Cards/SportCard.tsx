import { useDispatch } from 'react-redux';
import { useSportValidation } from '../../hooks/useSportValidation';
import { useSportModal } from '../../hooks/useSportModal';
import Table from '../Tables/Table';
import styles from './Cards.module.scss';
import EntityForm from '../Forms/EntityForm';
import MatchForm from '../Forms/MatchForm';
import MatchResults from '../Tables/MatchResults';
import { useSportData } from '../../hooks/useSportData';
import ModalButtons from '../Buttons/ModalButtons';
import SportModal from '../Modals/SportModal';
import type { SportConfig } from '../../config/sports';
import { SportCardProvider } from '../../context/SportCardContext';
import type { MatchInput } from '../../types';

interface Props {
  config: SportConfig;
}

const SportCard: React.FC<Props> = ({ config }) => {
  const {
    title,
    type,
    theme,
    slice,
    showMatchResults,
    showScoreTableTitle,
    headerIcon,
  } = config;
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

  const onAddMatch = (matchData: MatchInput) => {
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
    <SportCardProvider value={{ type, theme }}>
      <div className={`${styles.card} ${styles[theme]}`}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>
            {headerIcon && (
              <svg
                className={styles.headerIcon}
                viewBox={headerIcon.viewBox}
                aria-hidden="true"
                focusable="false"
              >
                {headerIcon.paths.map((path: string) => (
                  <path
                    key={path}
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
            )}
            <span>{title}</span>
          </h2>
        </header>

        <div className={styles.content}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {useModalForms ? (
            <ModalButtons
              onAddEntity={openEntityModal}
              onAddMatch={openMatchModal}
            />
          ) : (
            <>
              <EntityForm onSubmit={onAddEntity} />
              <MatchForm entities={data.entities} onSubmit={onAddMatch} />
            </>
          )}

          {showMatchResults && (
            <MatchResults matches={data.matches} entities={data.entities} />
          )}

          {showScoreTableTitle && (
            <h3 className={styles.tableTitle}>Score Table:</h3>
          )}

          <Table entities={data.entities} />
        </div>

        <SportModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          modalType={modalState.modalType as 'entity' | 'match'}
          entities={modalState.modalType === 'match' ? data.entities : []}
        />
      </div>
    </SportCardProvider>
  );
};

export default SportCard;
