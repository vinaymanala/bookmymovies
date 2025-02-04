import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// const VITE_BEARER_AUTH_KEY = import.meta.env.VITE_BEARER_AUTH_KEY;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

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
  poster: string;
  backdrop: string;
  critic_score: number | null;
  user_rating: number | null;
  genre_names: [];
  relevance_percentile: number | null;
  original_language: string;
  plot_overview: string;
  type: string;
  imdb_id: number | null;
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
    poster: "",
    backdrop: "",
    critic_score: null,
    user_rating: null,
    genre_names: [],
    relevance_percentile: null,
    original_language: "",
    plot_overview: "",
    type: "",
    imdb_id: null,
  },
};

//ASYNC ACTIONS
export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (id: number | null, thunkApi) => {
    try {
      // https://api.watchmode.com/v1/title/345534/details/?apiKey=YOUR_API_KEY
      // const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${API_KEY}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // Authorization: `Bearer ${VITE_BEARER_AUTH_KEY}`,
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
