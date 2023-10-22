import React, { useEffect, useRef } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getMovies, setIsMoviesLoading } from "./MoviesSlice";

type MoviesListProps = {
  data: any;
  title: String;
};

const MoviesSection = () => {
  const popularMoviesRef = useRef<any>();
  const topRatedMoviesRef = useRef<any>();

  const dispatch = useAppDispatch();

  const { results, isLoading } = useAppSelector((state) => state.search);
  const { popularMovies, topRatedMovies, isMoviesLoading } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(setIsMoviesLoading(true));
    setTimeout(() => dispatch(getMovies()), 2000);
  }, []);

  const handleLeftScroll = (ref: React.MutableRefObject<any>) => {
    ref.current?.scrollBy(-1035, 0);
  };

  const handleRightScroll = (ref: React.MutableRefObject<any>) => {
    ref.current?.scrollBy(1035, 0);
  };

  const PopularMoviesList = ({ data, title }: MoviesListProps) => {
    return (
      <div className="movies__content">
        <div className="title">
          <h3 id={`${title}`}>{title}</h3>
          {isMoviesLoading ? (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
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
              {data?.map((movie: any, id: number) => (
                <div key={id} className="movie__card">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie?.original_title}
                  />
                  <h5 className="movie__title">{movie?.original_title}</h5>
                </div>
              ))}
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
        <div className="title">
          <h3>{title}</h3>
          {isMoviesLoading ? (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div className="movies__list" ref={topRatedMoviesRef}>
              {data.length ? (
                <button
                  className="left__arrow"
                  onClick={() => handleLeftScroll(topRatedMoviesRef)}
                >
                  {"<"}
                </button>
              ) : null}
              {data?.map((movie: any, id: number) => (
                <div key={id} className="movie__card">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie?.original_title}
                  />
                  <h5 className="movie__title">{movie?.original_title}</h5>
                </div>
              ))}
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
  return (
    <React.Fragment>
      <div className="movies">
        {isLoading ? (
          <div className="movie__grid">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : results && results.length ? (
          <div className="movie__grid">
            {results.map((movie: any, id: number) => (
              <div key={id} className="movie__card">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={movie?.original_title}
                />
                <h5 className="movie__title">{movie?.original_title}</h5>
              </div>
            ))}
          </div>
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
