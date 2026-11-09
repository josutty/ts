import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = { vehicleId: null as string | null };

export const selectedVehicleSlice = createSlice({
  name: 'selectedVehicle',
  initialState,
  reducers: {
    vehicleSelected: (state, action: PayloadAction<string>) => {
      state.vehicleId = action.payload;
    },
    vehicleCleared: () => initialState,
  },
  selectors: { selectVehicleId: (state) => state.vehicleId },
});

export const { vehicleSelected, vehicleCleared } = selectedVehicleSlice.actions;
