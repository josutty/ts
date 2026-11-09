import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DriverScoreSort = 'mostRecent' | 'highestScore' | 'lowestScore' | 'driverName';
const initialState = { query: '', sort: 'mostRecent' as DriverScoreSort };

export const driverScoreSearchSlice = createSlice({
  name: 'driverScoreSearch',
  initialState,
  reducers: {
    searchChanged: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    sortChanged: (state, action: PayloadAction<DriverScoreSort>) => {
      state.sort = action.payload;
    },
  },
  selectors: { selectQuery: (state) => state.query, selectSort: (state) => state.sort },
});

export const { searchChanged, sortChanged } = driverScoreSearchSlice.actions;
