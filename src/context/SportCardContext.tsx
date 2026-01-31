import React from 'react';
import {
  SportCardContext,
  type SportCardContextValue,
} from './sportCardContext';

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
