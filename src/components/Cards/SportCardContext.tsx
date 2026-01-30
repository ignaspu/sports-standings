import React, { createContext, useContext } from 'react';
import type { SportType, Theme } from '../../types';

type SportCardContextValue = {
  type: SportType;
  theme: Theme;
};

const SportCardContext = createContext<SportCardContextValue | null>(null);

export const SportCardProvider: React.FC<{
  value: SportCardContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <SportCardContext.Provider value={value}>
      {children}
    </SportCardContext.Provider>
  );
};

export const useSportCardContext = (): SportCardContextValue => {
  const context = useContext(SportCardContext);

  if (!context) {
    throw new Error(
      'useSportCardContext must be used within SportCardProvider'
    );
  }

  return context;
};
