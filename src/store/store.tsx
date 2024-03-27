import {create, StateCreator} from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsArticle } from '../models/homeModel';
import { devtools,persist  } from 'zustand/middleware';



// Define your store state type
export interface HeadlinesState {
  headlines: NewsArticle[]; // Use specific type
  setHeadlines: (headlines:NewsArticle[])=> void
}


export const headlinesSlice: StateCreator<HeadlinesState> = (set : (partial: HeadlinesState | ((state: HeadlinesState) => HeadlinesState)) => void) => ({
  headlines: [],
  setHeadlines: (headlines: NewsArticle[]) => set(state => ({ ...state, headlines })),
});

// export const useHeadlinesStore = create<HeadlinesState>()(
//   persist(
//     devtools((...a) => ({
//         ...headlinesSlice(...a),
//     })),
//     { name: "headlines" },
// )
// );


