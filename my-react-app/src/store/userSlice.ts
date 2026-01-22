import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string | null;
};

const initialState: UserState = {
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string | null>) {
      state.name = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
