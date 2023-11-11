//types

export type Result = {
  poster_path: any;
  original_title: string | undefined;
  results: null | Result[];
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
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};
