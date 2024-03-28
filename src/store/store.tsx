import {create, StateCreator} from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsArticle } from '../models/homeModel';
import { devtools,persist  } from 'zustand/middleware';



interface filterValue{
  fromDate:string,
  toDate:string,
  type:string
}
// Define your store state type
export interface HeadlinesState {
  headlines: NewsArticle[]; // Use specific type
  setHeadlines: (headlines:NewsArticle[])=> void;
  isNetwork : boolean,
  setNetwork:(connection : boolean)=>void;
  search:string;
  setSearch:(query:string)=> void;
  openFilter:boolean;
  setFilter:(filterStatus:boolean) => void;
  filterValues:filterValue;
  setFilterValues:(filter:filterValue) => void;
  // clearQuery:()=>void
}


export const headlinesSlice: StateCreator<HeadlinesState> = (set : (partial: HeadlinesState | ((state: HeadlinesState) => HeadlinesState)) => void) => ({
  headlines: [],
  setHeadlines: (headlines: NewsArticle[]) => set(state => ({ ...state, headlines })),
  isNetwork: false,
  setNetwork :(connection : boolean) => set(state=>({...state,isNetwork:connection})),
  search:"",
  setSearch :(query : string) => set(state=>( {...state,search:query  })),
  openFilter: false,
  setFilter :(filterStatus : boolean) => set(state=>(console.log(filterStatus),{...state,openFilter:filterStatus})),
  filterValues:{  fromDate:"",
    toDate:"",
    type:""},
  setFilterValues:(filter:filterValue) => set(state=>({...state,filter}))

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


