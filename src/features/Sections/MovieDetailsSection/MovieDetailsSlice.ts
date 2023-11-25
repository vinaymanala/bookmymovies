import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;

type Genre = {
  name: string;
};

type LanguageInfo = {
  english_name: "";
  name: "";
};
type MovieDetail = {
  poster_path: string;
  original_title: string;
  backdrop_path: string;
  vote_count: number | null;
  vote_average: number | null;
  popularity: number | null;
  genres: Genre[];
  tagline: string;
  overview: "";
  spoken_languages: LanguageInfo[];
};

interface initialStateProps {
  isLoading: boolean;
  error: null;
  movie: MovieDetail;
}

const initialState: initialStateProps = {
  isLoading: false,
  error: null,
  movie: {
    poster_path: "",
    original_title: "",
    backdrop_path: "",
    vote_count: null,
    vote_average: null,
    popularity: null,
    genres: [],
    tagline: "",
    overview: "",
    spoken_languages: [],
  },
};

//ASYNC ACTIONS
export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (id: number | null, thunkApi) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
        },
      };

      const response = await axios.get(url, options);
      return response.data;
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

// SLICE
export const movieDetailReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setIsLoading: (state = initialState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMovieDetails.pending, (state = initialState) => {
        state.isLoading = true;
      })
      .addCase(
        getMovieDetails.fulfilled,
        (state = initialState, action: PayloadAction<MovieDetail>) => {
          state.isLoading = false;
          state.movie = action.payload;
        }
      )
      .addCase(
        getMovieDetails.rejected,
        (state = initialState, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setIsLoading } = movieDetailReducer.actions;
export default movieDetailReducer.reducer;
