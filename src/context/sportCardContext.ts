import { createContext } from 'react';
import type { SportType, Theme } from '../types';

export type SportCardContextValue = {
  type: SportType;
  theme: Theme;
};

export const SportCardContext = createContext<SportCardContextValue | null>(
  null
);
