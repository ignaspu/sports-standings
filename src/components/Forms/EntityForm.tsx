import React, { useState } from 'react';
import type { SportType } from '../../types/index';
import styles from './Forms.module.scss';
import classnames from 'classnames';

interface EntityFormProps {
  type: SportType;
  onSubmit: (name: string) => void;
  theme: 'minimal' | 'energetic' | 'centric';
  compact?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({
  type,
  onSubmit,
  theme,
  compact = false,
}) => {
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

  const placeholder =
    type === 'tennis'
      ? 'Gaubas...'
      : type === 'football'
        ? 'Liverpool...'
        : 'Lithuania...';

  return (
    <section
      className={classnames(styles.entity, styles[theme], {
        [styles.compact]: compact,
      })}
    >
      <div className={styles.entityForm}>
        {!compact && <h3>Add {type === 'tennis' ? 'Player' : 'Team'}</h3>}
        <div className={styles.inputGroup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
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
