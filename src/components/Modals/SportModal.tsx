import Modal from '../Modals/Modal';
import EntityForm from '../Forms/EntityForm';
import MatchForm from '../Forms/MatchForm';
import type { Entity } from '../../types';
import { useSportCardContext } from '../Cards/SportCardContext';
import { getSportConfig } from '../../config/sports';

type ModalType = 'entity' | 'match';

interface SportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  modalType: ModalType;
  entities?: Entity[];
}

const SportModal: React.FC<SportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  modalType,
  entities = [],
}) => {
  const { type } = useSportCardContext();
  const { entityLabel } = getSportConfig(type);
  const getTitle = () => {
    if (modalType === 'entity') {
      return `Add ${entityLabel}`;
    }
    return 'Add Score';
  };

  const handleSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      {modalType === 'entity' ? (
        <EntityForm onSubmit={handleSubmit} compact />
      ) : (
        <MatchForm entities={entities} onSubmit={handleSubmit} compact />
      )}
    </Modal>
  );
};

export default SportModal;
