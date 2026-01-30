import React from 'react';
import styles from './Buttons.module.scss';
import classnames from 'classnames';

interface ModalButtonsProps {
  onAddEntity: () => void;
  onAddMatch: () => void;
  theme: 'minimal' | 'energetic' | 'centric';
  type: 'football' | 'basketball' | 'tennis';
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  onAddEntity,
  onAddMatch,
  theme,
  type,
}) => {
  return (
    <div className={styles.modalButtons}>
      <button
        className={classnames(styles.button, styles[theme])}
        onClick={onAddEntity}
      >
        <span className={styles.plus}>+</span> Add {type === 'tennis' ? 'Player' : 'Team'}
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
