import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/Nav/SearchSlice";
import moviesReducer from "../features/Sections/MoviesSection/MoviesSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
