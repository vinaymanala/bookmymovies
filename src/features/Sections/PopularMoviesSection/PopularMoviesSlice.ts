import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ResultsPerPage } from "../../../utils/types";
// const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

function convertoYYYMMDD(date: Date, daysMinus: number) {
  daysMinus !== 0 && date.setDate(date.getDate() - daysMinus);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

const initialState: ResultsPerPage = {
  data: {
    results: [],
    total_pages: 0,
  },
  index: 1,
  start_date: Number(convertoYYYMMDD(new Date(Date.now()), 30)),
  end_date: Number(convertoYYYMMDD(new Date(Date.now()), 0)),
  isMoviesLoading: false,
  totalPages: 1,
  error: null,
};

//ACTION
export const getPopularMoviesByDate = createAsyncThunk(
  "popular/getPopularMoviesByDate",
  async ({ start_date, end_date }: any, thunkApi) => {
    try {
      // const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${index}`;
      const url = `https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}&start_date=${start_date}&end_date=${end_date}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
        },
      };
      const response = await axios.get(url, options);

      return response.data?.releases;
      // .filter(
      //   (show: any) => show?.tmdb_type === "movie"
      // );
    } catch (error: any) {
      return thunkApi.rejectWithValue({ start_date, end_date } + error.message);
      // console.log(error);
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
    setPageIndex: (state = initialState, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setDate: (state = initialState, action: PayloadAction<any>) => {
      let { start_date, end_date } = action.payload;
      state.start_date = start_date;
      state.end_date = end_date;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMoviesByDate.pending, (state = initialState) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getPopularMoviesByDate.fulfilled,
        (state = initialState, action: PayloadAction<any>) => {
          state.isMoviesLoading = false;
          // const { results, total_pages } = action.payload;
          const data = action.payload;
          state.data.results = state.data.results?.concat(data) as [];

          // state.data.total_pages = total_pages;
        }
      )
      .addCase(
        getPopularMoviesByDate.rejected,
        (state = initialState, action: PayloadAction<any>) => {
          state.isMoviesLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setPopularCurrentPage, setTotalPages, setIsLoading, setDate } =
  popularMoviesReducer.actions;

export default popularMoviesReducer.reducer;
