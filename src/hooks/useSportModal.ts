import { useState, useCallback } from 'react';
import type { SportType } from '../types';
import { getSportConfig } from '../config/sports';

type ModalType = 'entity' | 'match' | null;

interface UseSportModalProps {
  type: SportType;
  onAddEntity: (name: string) => void;
  onAddMatch: (matchData: any) => void;
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
    (data: any) => {
      if (modalState.modalType === 'entity') {
        onAddEntity(data);
      } else if (modalState.modalType === 'match') {
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
