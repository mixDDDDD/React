import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel } from '../types/movie';

type FavoritesState = {
  items: MovieModel[];
};

const initialState: FavoritesState = {
  items: [],
};

export const getFavoritesKey = (userName: string) =>
  `favorites_${userName}`;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<MovieModel[]>) {
      state.items = action.payload;
    },

    addFavorite(state, action: PayloadAction<MovieModel>) {
      const exists = state.items.some(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
