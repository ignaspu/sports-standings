import { useContext } from 'react';
import {
  SportCardContext,
  type SportCardContextValue,
} from './sportCardContext';

export const useSportCardContext = (): SportCardContextValue => {
  const context = useContext(SportCardContext);

  if (!context) {
    throw new Error(
      'useSportCardContext must be used within SportCardProvider'
    );
  }

  return context;
};
