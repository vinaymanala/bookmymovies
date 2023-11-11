import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../../utils/types";
import axios from "axios";
const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;

interface SearchState {
  results: null | Result[];
  query: string;
  isLoading: boolean;
  error: null;
}

const initialState: SearchState = {
  results: [],
  query: "",
  isLoading: false,
  error: null,
};

type Data = { value: string; signal: AbortSignal };

//ACTION
export const getMoviesByName = createAsyncThunk(
  "search/getMoviesByName",
  async ({ value, signal }: Data, thunkApi) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
        },
        signal,
      };
      const response = await axios.get(url, options);
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
      // console.log(error);
    }
  }
);

// SLICE
export const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setResults: (state = initialState, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    },
    setIsLoading: (state = initialState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setQuery: (state = initialState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMoviesByName.pending, (state = initialState) => {
        state.isLoading = true;
        state.results = [];
      })
      .addCase(
        getMoviesByName.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.isLoading = false;
          state.results = action.payload;
        }
      )
      .addCase(
        getMoviesByName.rejected,
        (state, action: PayloadAction<any>) => {
          (state.isLoading = state.results?.length ? false : true),
            (state.error = action.payload);
        }
      );
  },
});

export const { setResults, setIsLoading, setQuery } = searchReducer.actions;

export default searchReducer.reducer;
