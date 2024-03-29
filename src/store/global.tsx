import {create} from 'zustand';
import {headlinesSlice, HeadlinesState} from './store';

type storeType = HeadlinesState;

export const useGlobalStore = create<storeType>((...a) => ({
  ...headlinesSlice(...a),
}));
