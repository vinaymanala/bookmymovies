import React, { useEffect, useRef } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getMovies, setIsMoviesLoading } from "./MoviesSlice";
import { MoviesListProps, Result } from "../../../utils/types";
import Loader from "../../ui/Loader";
import { MovieCard } from "../../ui/MovieCard";

const MoviesSection = () => {
  const popularMoviesRef = useRef<any>();
  const topRatedMoviesRef = useRef<any>();

  const dispatch = useAppDispatch();

  const { results, isLoading, query } = useAppSelector((state) => state.search);
  const { popularMovies, topRatedMovies, isMoviesLoading } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(setIsMoviesLoading(true));
    setTimeout(() => dispatch(getMovies()), 2000);
  }, []);

  useEffect;

  const handleLeftScroll = (ref: React.MutableRefObject<any>) => {
    ref.current?.scrollBy(-1035, 0);
  };

  const handleRightScroll = (ref: React.MutableRefObject<any>) => {
    ref.current?.scrollBy(1035, 0);
  };

  const PopularMoviesList = ({ data, title }: MoviesListProps) => {
    return (
      <div className="movies__content">
        <div className="movie__section">
          <div className="flex">
            <h3>{title}</h3>
            <Link to="popular" className="nav__link btn__viewall">
              View All
            </Link>
          </div>
          {isMoviesLoading ? (
            <Loader />
          ) : (
            <div className="movies__list" ref={popularMoviesRef}>
              {data.length ? (
                <button
                  className="left__arrow"
                  onClick={() => handleLeftScroll(popularMoviesRef)}
                >
                  {"<"}
                </button>
              ) : null}
              {data?.map((movie: Result) =>
                movie?.poster_path && movie?.original_title ? (
                  <MovieCard
                    id={movie?.id}
                    poster_path={movie?.poster_path}
                    original_title={movie?.original_title}
                  />
                ) : null
              )}
              {data.length ? (
                <button
                  className="right__arrow"
                  onClick={() => handleRightScroll(popularMoviesRef)}
                >
                  {">"}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  };

  const TopTRatedMoviesList = ({ data, title }: MoviesListProps) => {
    return (
      <div className="movies__content">
        <div className="movie__section">
          <div className="flex">
            <h3>{title}</h3>
            <Link to="toprated" className="nav__link btn__viewall">
              View All
            </Link>
          </div>
          {isMoviesLoading ? (
            <Loader />
          ) : (
            <div className="movies__list " ref={topRatedMoviesRef}>
              {data.length ? (
                <button
                  className="left__arrow"
                  onClick={() => handleLeftScroll(topRatedMoviesRef)}
                >
                  {"<"}
                </button>
              ) : null}
              {data?.map((movie: Result) =>
                movie?.poster_path && movie?.original_title ? (
                  <MovieCard
                    id={movie?.id}
                    poster_path={movie?.poster_path}
                    original_title={movie?.original_title}
                  />
                ) : null
              )}
              {data.length ? (
                <button
                  className="right__arrow"
                  onClick={() => handleRightScroll(topRatedMoviesRef)}
                >
                  {">"}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  };

  const SearchedMovies = () => {
    return (
      <div className="movie__grid">
        {results?.length ? (
          results.map((movie: Result) =>
            movie?.poster_path && movie?.original_title ? (
              <MovieCard
                id={movie?.id}
                poster_path={movie?.poster_path}
                original_title={movie?.original_title}
              />
            ) : null
          )
        ) : (
          <p className="resultNotFound">No results found</p>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="movies">
        {isLoading ? (
          <div className="movie__grid">
            <Loader />
          </div>
        ) : query !== "" ? (
          <SearchedMovies />
        ) : (
          <>
            <PopularMoviesList data={popularMovies} title={"Popular"} />
            <TopTRatedMoviesList data={topRatedMovies} title={"Top Rated"} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default MoviesSection;
