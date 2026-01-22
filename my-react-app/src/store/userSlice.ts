import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  name: string | null;
};

const initialState: UserState = {
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    logout(state) {
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
