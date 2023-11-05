import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/Nav/SearchSlice";
import moviesReducer from "../features/Sections/MoviesSection/MoviesSlice";
import popularMoviesReducer from "../features/Sections/PopularMoviesSection/PopularMoviesSlice";
import topratedMoviesReducer from "../features/Sections/TopRatedMoviesSection/TopRatedMoviesSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    popular: popularMoviesReducer,
    toprated: topratedMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
