import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@shared/api';
import { sessionSlice } from '@entities/session';
import { selectedVehicleSlice } from '@features/select-vehicle';
import { vehicleSearchSlice } from '@features/search-vehicles';
import { driverScoreSearchSlice } from '@features/search-driver-scores';
import { rejectionLogger } from './middleware';

export const rootReducer = combineSlices(
  baseApi,
  sessionSlice,
  selectedVehicleSlice,
  vehicleSearchSlice,
  driverScoreSearchSlice,
);

export const makeStore = (preloadedState?: Partial<ReturnType<typeof rootReducer>>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, rejectionLogger),
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
