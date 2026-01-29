import { useSelector } from 'react-redux';
import type { RootState, SportType } from '../types/index';

export const useSportData = (type: SportType) => {
  return useSelector((state: RootState) => state[type]);
};
