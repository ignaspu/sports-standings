import styles from './Buttons.module.scss';
import classnames from 'classnames';
import { useSportCardContext } from '../../context/useSportCardContext';
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
  const isTennis = type === 'tennis';

  return (
    <div className={styles.modalButtons}>
      <button
        className={classnames(styles.button, styles[theme], {
          [styles.tennisAddEntity]: isTennis,
        })}
        onClick={onAddEntity}
      >
        <span className={styles.plus}>+</span> Add {entityLabel}
      </button>

      <button
        className={classnames(styles.button, styles[theme], {
          [styles.tennisAddScore]: isTennis,
        })}
        onClick={onAddMatch}
      >
        <span className={styles.plus}>+</span> Add Score
      </button>
    </div>
  );
};

export default ModalButtons;
