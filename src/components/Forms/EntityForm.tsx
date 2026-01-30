import React, { useState } from 'react';
import styles from './Forms.module.scss';
import classnames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';

interface EntityFormProps {
  onSubmit: (name: string) => void;
  compact?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({ onSubmit, compact = false }) => {
  const { type, theme } = useSportCardContext();
  const { entityLabel, entityPlaceholder } = getSportConfig(type);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
      setName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section
      className={classnames(styles.entity, styles[theme], {
        [styles.compact]: compact,
      })}
    >
      <div className={styles.entityForm}>
        {!compact && <h3>Add {entityLabel}</h3>}
        <div className={styles.inputGroup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={entityPlaceholder}
            autoFocus={compact}
          />
          <button
            onClick={handleSubmit}
            className={styles.addButton}
            disabled={!name.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default EntityForm;
