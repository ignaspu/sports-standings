import { useState, useCallback } from 'react';
import type { MatchInput, SportType } from '../types';
import { getSportConfig } from '../config/sports';

type ModalType = 'entity' | 'match' | null;

interface UseSportModalProps {
  type: SportType;
  onAddEntity: (name: string) => void;
  onAddMatch: (matchData: MatchInput) => void;
}

export const useSportModal = ({
  type,
  onAddEntity,
  onAddMatch,
}: UseSportModalProps) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    modalType: ModalType;
  }>({
    isOpen: false,
    modalType: null,
  });

  const openModal = useCallback((modalType: ModalType) => {
    setModalState({ isOpen: true, modalType });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, modalType: null });
  }, []);

  const handleSubmit = useCallback(
    (data: MatchInput | string) => {
      if (modalState.modalType === 'entity' && typeof data === 'string') {
        onAddEntity(data);
      } else if (modalState.modalType === 'match' && typeof data !== 'string') {
        onAddMatch(data);
      }
      closeModal();
    },
    [modalState.modalType, onAddEntity, onAddMatch, closeModal]
  );

  const openEntityModal = useCallback(() => openModal('entity'), [openModal]);
  const openMatchModal = useCallback(() => openModal('match'), [openModal]);

  const useModalForms = getSportConfig(type).useModalForms;

  return {
    modalState,
    openEntityModal,
    openMatchModal,
    closeModal,
    handleSubmit,
    useModalForms,
  };
};
