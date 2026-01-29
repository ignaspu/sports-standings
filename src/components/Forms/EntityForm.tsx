import React, { useState } from 'react';
import type { SportType } from '../../types/index';
import styles from './Forms.module.scss';

interface EntityFormProps {
  type: SportType;
  onSubmit: (name: string) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ type, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
  };

  const placeholder =
    type === 'tennis'
      ? 'Gaubas...'
      : type === 'football'
        ? 'Liverpool...'
        : 'Lithuania...';

  return (
    <section className={styles.section}>
      <h3>Add {type === 'tennis' ? 'Player' : 'Team'}</h3>
      <div className={styles.inputGroup}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
        />
        <button onClick={handleSubmit} className={styles.addButton}>
          Add
        </button>
      </div>
    </section>
  );
};

export default EntityForm;
