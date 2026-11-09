import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { sessionExpired } from '@shared/api';
import type { Session } from '@shared/api';

interface SessionState {
  user: Session | null;
  status: 'signedOut' | 'signedIn';
  authError?: string;
}

const initialState: SessionState = { user: null, status: 'signedOut' };

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<Session>) {
      state.user = action.payload;
      state.status = 'signedIn';
      state.authError = undefined;
    },
    signedOut: () => initialState,
    authFailed(state, action: PayloadAction<string>) {
      state.authError = action.payload;
      state.status = 'signedOut';
    },
  },
  extraReducers: (builder) => builder.addCase(sessionExpired, () => initialState),
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.status === 'signedIn',
    selectAuthError: (state) => state.authError,
  },
});

export const { signedIn, signedOut, authFailed } = sessionSlice.actions;
