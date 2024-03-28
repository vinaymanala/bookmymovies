import React, { useEffect } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPopularMoviesByIndex } from "./PopularMoviesSlice";
import Loader from "../../ui/Loader";
import { Result } from "../../../utils/types";
// import Pagination from "../../ui/Pagination";
import { PopularMovieCard } from "../../ui/MovieCard/";

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
      <div className="gridmovie__section">
        <div className="flex" style={{ marginBottom: "1rem" }}>
          <h3 className="section__title">{"Popular Movies"}</h3>
          {/* {!isMoviesLoading && (
            <Pagination currentPage={index} totalPages={data?.total_pages} />
          )} */}
        </div>
        {isMoviesLoading ? (
          <Loader />
        ) : (
          <div className="gridmovie__grid">
            {data &&
              data.results?.map(
                (movie: Result) =>
                  movie?.poster_url &&
                  movie?.title && (
                    <PopularMovieCard
                      id={movie?.id}
                      poster_path={movie?.poster_url}
                      original_title={movie?.title}
                    />
                  )
              )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PopularMoviesSection;
