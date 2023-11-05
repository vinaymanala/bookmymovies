import React, { useEffect, useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPopularMoviesByIndex } from "./PopularMoviesSlice";
import Loader from "../../Loader";
import { Result } from "../../../utils/types";
import Pagination from "../../Pagination";

const PopularMoviesSection = () => {
  const { index, data, isMoviesLoading } = useAppSelector(
    (state) => state.popular
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopularMoviesByIndex(index));
  }, [index]);

  return (
    <React.Fragment>
      <div className="popular__section">
        <div className="flex" style={{ marginBottom: "1rem" }}>
          <h3>{"Popular Movies"}</h3>
          {!isMoviesLoading && (
            <Pagination currentPage={index} totalPages={data?.total_pages} />
          )}
        </div>
        {isMoviesLoading ? (
          <Loader />
        ) : (
          <div className="movie__grid">
            {data &&
              data.results?.map(
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
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PopularMoviesSection;
