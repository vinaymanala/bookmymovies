//types

export type Result = {
  id: number;
  poster_path: any;
  original_title: string | undefined;
  results: null | Result[];
  title: string;
  source_id: number;
  poster_url: any;
  name: string;
  image_url: string;
};

export type MoviesListProps = {
  data: any;
  title: String;
};

export type MovieCardProps = {
  id: number;
  poster_path: string;
  original_title: string;
};
export type Data = {
  results: null | Result[];
  total_pages: number;
};

export interface ResultData {
  results: null | Result[];
  total_pages: number;
}

export type ResultsPerPage = {
  // results: null | Results[];
  data: ResultData;
  index: number;
  totalPages: number;
  isMoviesLoading: boolean;
  error: null;
  start_date: number;
  end_date: number;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export type SelectedSeatProp = {
  id: number;
  seat: string;
  selected: boolean;
};

export type SeatGridProp = {
  id: number;
  seat: string;
  selected: boolean;
};
