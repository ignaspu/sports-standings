import styles from './Buttons.module.scss';
import classnames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';

interface ModalButtonsProps {
  onAddEntity: () => void;
  onAddMatch: () => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  onAddEntity,
  onAddMatch,
}) => {
  const { theme, type } = useSportCardContext();
  const { entityLabel } = getSportConfig(type);

  return (
    <div className={styles.modalButtons}>
      <button
        className={classnames(styles.button, styles[theme])}
        onClick={onAddEntity}
      >
        + Add {entityLabel}
      </button>

      <button
        className={classnames(styles.button, styles[theme])}
        onClick={onAddMatch}
      >
        <span className={styles.plus}>+</span> Add Score
      </button>
    </div>
  );
};

export default ModalButtons;
