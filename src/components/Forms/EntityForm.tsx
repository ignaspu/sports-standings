import React, { useState } from 'react';
import styles from './Forms.module.scss';
import classnames from 'classnames';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';
import { countryOptions } from '../../data/countries';

interface EntityFormProps {
  onSubmit: (name: string) => void;
  compact?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({
  onSubmit,
  compact = false,
}) => {
  const { type, theme } = useSportCardContext();
  const { entityLabel, entityPlaceholder, nameMinLength, nameMaxLength } =
    getSportConfig(type);
  const [name, setName] = useState('');

  const trimmedName = name.trim();
  const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const isNameValid =
    trimmedName.length >= nameMinLength &&
    trimmedName.length <= nameMaxLength &&
    namePattern.test(trimmedName);

  const handleSubmit = () => {
    if (isNameValid) {
      onSubmit(trimmedName);
      setName('');
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
          {type === 'basketball' ? (
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus={compact}
            >
              <option value="" disabled>
                {entityPlaceholder}
              </option>
              {countryOptions.map((option) => (
                <option key={option.code} value={option.country}>
                  {option.country}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={entityPlaceholder}
              autoFocus={compact}
              minLength={nameMinLength}
              maxLength={nameMaxLength}
              pattern={namePattern.source}
              title={`${entityLabel} name must be ${nameMinLength}-${nameMaxLength} letters only.`}
            />
          )}
          <button
            onClick={handleSubmit}
            className={styles.addButton}
            disabled={!isNameValid}
          >
            Add
          </button>
        </div>
        {trimmedName && !isNameValid && (
          <p className={styles.helper}>
            {entityLabel} names must be {nameMinLength}-{nameMaxLength} letters
            only.
          </p>
        )}
      </div>
    </section>
  );
};

export default EntityForm;
