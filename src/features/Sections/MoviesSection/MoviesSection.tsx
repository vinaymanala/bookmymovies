import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getMovies, setIsMoviesLoading } from "./MoviesSlice";
import { MoviesListProps, Result } from "../../../utils/types";
import Loader from "../../Loader";

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
              {data?.map(
                (movie: Result, id: number) =>
                  movie?.poster_path &&
                  movie?.original_title && (
                    <div key={id} className="movie__card">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                        alt={movie?.original_title}
                      />
                      <h5 className="movie__title">{movie?.original_title}</h5>
                    </div>
                  )
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
              {data?.map(
                (movie: Result, id: number) =>
                  movie?.poster_path &&
                  movie?.original_title && (
                    <div key={id} className="movie__card">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                        alt={movie?.original_title}
                      />
                      <h5 className="movie__title">{movie?.original_title}</h5>
                    </div>
                  )
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
          results.map(
            (movie: Result, id: number) =>
              movie?.poster_path &&
              movie?.original_title && (
                <div key={id} className="movie__card">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie?.original_title}
                  />
                  <h5 className="movie__title">{movie?.original_title}</h5>
                </div>
              )
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
