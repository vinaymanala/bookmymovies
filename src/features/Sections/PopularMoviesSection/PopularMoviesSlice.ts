import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ResultsPerPage } from "../../../utils/types";
// const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const initialState: ResultsPerPage = {
  data: {
    results: null,
    total_pages: 0,
  },
  index: 1,
  isMoviesLoading: false,
  totalPages: 1,
  error: null,
};

//ACTION
export const getPopularMoviesByIndex = createAsyncThunk(
  "popular/getPopularMoviesByIndex",
  async (index: number, thunkApi) => {
    try {
      // const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${index}`;
      const url = `https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
        },
      };
      const response = await axios.get(url, options);

      return response.data?.releases.filter(
        (show: any) => show?.tmdb_type === "movie"
      );
    } catch (error: any) {
      return thunkApi.rejectWithValue(index + error.message);
      console.log(error);
    }
  }
);

//SLICE
export const popularMoviesReducer = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularCurrentPage: (
      state = initialState,
      action: PayloadAction<number>
    ) => {
      state.index = action.payload;
    },
    setIsLoading: (state = initialState, action: PayloadAction<boolean>) => {
      state.isMoviesLoading = action.payload;
    },
    setTotalPages: (state = initialState, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMoviesByIndex.pending, (state = initialState) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getPopularMoviesByIndex.fulfilled,
        (state = initialState, action: PayloadAction<any>) => {
          state.isMoviesLoading = false;
          // const { results, total_pages } = action.payload;
          const data = action.payload;
          state.data.results = data;
          // state.data.total_pages = total_pages;
        }
      )
      .addCase(
        getPopularMoviesByIndex.rejected,
        (state = initialState, action: PayloadAction<any>) => {
          state.isMoviesLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setPopularCurrentPage, setTotalPages, setIsLoading } =
  popularMoviesReducer.actions;

export default popularMoviesReducer.reducer;
