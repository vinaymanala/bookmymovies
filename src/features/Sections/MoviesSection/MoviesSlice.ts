import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

type MoviesState = {
  popularMovies: [];
  topRatedMovies: [];
  isMoviesLoading: boolean;
  error: null;
};

const initialState: MoviesState = {
  popularMovies: [],
  topRatedMovies: [],
  isMoviesLoading: false,
  error: null,
};

//ACTION

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, thunkApi) => {
    try {
      // https://api.watchmode.com/v1/releases/?apiKey=O4mMWYBpiGc9lFEIMQwWVWaiAkkCagQE4KiAnSPO
      // const popularMovies = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      // const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;

      const movieAPIReq = `https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}&limit=30`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
        },
      };
      const getMovieAPIReq = await axios.get(movieAPIReq, options);

      // const getPopularMovies = await axios.get(popularMovies, options);
      // const getTopRatedMovies = await axios.get(topRatedMovies, options);

      // const movieData = await Promise.all([getMovieAPIReq]);
      const getPopularMovies = getMovieAPIReq.data?.releases.filter(
        (shows: any) => shows?.tmdb_type === "movie"
      );
      const getTopRatedMovies = getMovieAPIReq.data?.releases.filter(
        (shows: any) => shows?.tmdb_type === "tv"
      );
      const [popular, topRated] = [getPopularMovies, getTopRatedMovies];
      // const [popular]
      // const [popular, topRated] = await Promise.all([
      //   getPopularMovies,
      //   getTopRatedMovies,
      // ]);

      // const popularData = await popular.data.results;
      // const topRatedData = await topRated.data.results;
      return [popular, topRated];
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

// SLICE

export const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopularMovies: (state = initialState, action: PayloadAction<[]>) => {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies: (state = initialState, action: PayloadAction<[]>) => {
      state.topRatedMovies = action.payload;
    },
    setIsMoviesLoading: (
      state = initialState,
      action: PayloadAction<boolean>
    ) => {
      state.isMoviesLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMovies.pending, (state = initialState) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getMovies.fulfilled,
        (state = initialState, action: PayloadAction<any>) => {
          state.isMoviesLoading = false;
          state.popularMovies = action.payload[0];
          state.topRatedMovies = action.payload[1];
          state.error = null;
        }
      )
      .addCase(
        getMovies.rejected,
        (state = initialState, action: PayloadAction<any>) => {
          (state.isMoviesLoading = false), (state.error = action.payload);
        }
      );
  },
});

export const { setPopularMovies, setTopRatedMovies, setIsMoviesLoading } =
  moviesReducer.actions;

export default moviesReducer.reducer;
