import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import userReducer from './userSlice';
import { favoritesListener } from './favoritesListener';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favoritesListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
