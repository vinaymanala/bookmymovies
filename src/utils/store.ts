import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/ui/Nav/SearchSlice";
import moviesReducer from "../features/Sections/MoviesSection/MoviesSlice";
import popularMoviesReducer from "../features/Sections/PopularMoviesSection/PopularMoviesSlice";
import topratedMoviesReducer from "../features/Sections/TopRatedMoviesSection/TopRatedMoviesSlice";
import movieDetailReducer from "../features/Sections/MovieDetailsSection/MovieDetailsSlice";
import bookingReducer from "../features/Sections/SeatGridSection/SeatGridSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    popular: popularMoviesReducer,
    toprated: topratedMoviesReducer,
    movie: movieDetailReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
