import {create, StateCreator} from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NewsArticle} from '../models/homeModel';
import {devtools, persist} from 'zustand/middleware';

export interface filterValue {
  fromDate: string;
  toDate: string;
  type: string;
}
// Define your store state type
export interface HeadlinesState {
  headlines: NewsArticle[]; // Use specific type
  setHeadlines: (headlines: NewsArticle[]) => void;
  isNetwork: boolean;
  setNetwork: (connection: boolean) => void;
  search: string;
  setSearch: (query: string) => void;
  openFilter: boolean;
  setFilter: (filterStatus: boolean) => void;
  filterValues: filterValue;
  setFilterValues: (filter: filterValue) => void;
  category: string;
  setCategory: (selectedCategory: string) => void;
  filterHistory: filterValue[];
  // setFilterHistory: (filterValue: filterValue) => void;
  // clearQuery:()=>void
}

export const headlinesSlice: StateCreator<HeadlinesState> = (
  set: (
    partial: HeadlinesState | ((state: HeadlinesState) => HeadlinesState),
  ) => void,
) => ({
  headlines: [],
  setHeadlines: (headlines: NewsArticle[]) =>
    set(state => ({...state, headlines: headlines})),
  isNetwork: false,
  setNetwork: (connection: boolean) =>
    set(state => ({...state, isNetwork: connection})),
  search: '',
  setSearch: (query: string) => set(state => ({...state, search: query})),
  openFilter: false,
  setFilter: (filterStatus: boolean) =>
    set(state => ({...state, openFilter: filterStatus})),
  filterValues: {fromDate: '', toDate: '', type: ''},
  setFilterValues: (filter: filterValue) => {
    console.log('filter store: ', filter);

    set(state => ({...state, filterValues: filter}));
  },
  category: 'all',
  setCategory: (selectedCategory: string) =>
    set(state => ({...state, category: selectedCategory})),
  filterHistory: [],
  // setFilterHistory: (filterValue: filterValue) =>
  //   set(state => ({...state, filterHistory.})),
  // clearQuery :() => set(state=>({...state,search:""})),
});

// export const useHeadlinesStore = create<HeadlinesState>()(
//   persist(
//     devtools((...a) => ({
//         ...headlinesSlice(...a),
//     })),
//     { name: "headlines" },
// )
// );
