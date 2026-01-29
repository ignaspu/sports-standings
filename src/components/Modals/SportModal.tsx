import React from 'react';
import Modal from '../Modals/Modal';
import EntityForm from '../Forms/EntityForm';
import MatchForm from '../Forms/MatchForm';
import type { Entity, SportType } from '../../types';

type ModalType = 'entity' | 'match';

interface SportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  theme: 'minimal' | 'energetic' | 'centric';
  type: SportType;
  modalType: ModalType;
  entities?: Entity[];
}

const SportModal: React.FC<SportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme,
  type,
  modalType,
  entities = [],
}) => {
  const getTitle = () => {
    if (modalType === 'entity') {
      return `Add ${type === 'tennis' ? 'Player' : 'Team'}`;
    }
    return 'Add Score';
  };

  const handleSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} theme={theme}>
      {modalType === 'entity' ? (
        <EntityForm type={type} theme={theme} onSubmit={handleSubmit} compact />
      ) : (
        <MatchForm
          type={type}
          entities={entities}
          theme={theme}
          onSubmit={handleSubmit}
          compact
        />
      )}
    </Modal>
  );
};

export default SportModal;
