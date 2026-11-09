import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = { query: '', expandedCategory: undefined as string | undefined };

export const vehicleSearchSlice = createSlice({
  name: 'vehicleSearch',
  initialState,
  reducers: {
    searchChanged: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    categoryExpanded: (state, action: PayloadAction<string | undefined>) => {
      state.expandedCategory = action.payload;
    },
  },
  selectors: { selectQuery: (state) => state.query, selectExpandedCategory: (state) => state.expandedCategory },
});

export const { searchChanged, categoryExpanded } = vehicleSearchSlice.actions;
