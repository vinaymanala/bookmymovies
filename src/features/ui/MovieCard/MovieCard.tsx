import { MovieCardProps } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({
  id,
  poster_path,
  original_title,
}: MovieCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="movie__card"
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
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
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="gridmovie__card"
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
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
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="gridmovie__card"
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={original_title}
      />
      <h5 className="gridmovie__title">{original_title}</h5>
    </div>
  );
};
