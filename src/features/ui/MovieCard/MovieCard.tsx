import { MovieCardProps } from "../../../utils/types";

export const MovieCard = ({
  id,
  poster_path,
  original_title,
}: MovieCardProps) => {
  return (
    <div key={id} className="movie__card">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={original_title}
      />
      <h5 className="movie__title">{original_title}</h5>
    </div>
  );
};

export const PopularMovieCard = ({
  id,
  poster_path,
  original_title,
}: MovieCardProps) => {
  return (
    <div key={id} className="gridmovie__card">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={original_title}
      />
      <h5 className="gridmovie__title">{original_title}</h5>
    </div>
  );
};

export const TopRatedMovieCard = ({
  id,
  poster_path,
  original_title,
}: MovieCardProps) => {
  return (
    <div key={id} className="gridmovie__card">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={original_title}
      />
      <h5 className="gridmovie__title">{original_title}</h5>
    </div>
  );
};
