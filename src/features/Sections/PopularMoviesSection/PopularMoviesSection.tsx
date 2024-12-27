import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPopularMoviesByDate, setDate } from "./PopularMoviesSlice";
import Loader from "../../ui/Loader";
import { Result } from "../../../utils/types";
import { PopularMovieCard } from "../../ui/MovieCard/";

const PopularMoviesSection = () => {
  const lastItemRef: any = useRef<IntersectionObserver | null>(null);
  const [noDataFound, setNoDataFound] = useState<boolean>(false);

  const { data, start_date, end_date, isMoviesLoading } = useAppSelector(
    (state) => state.popular
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data.results?.length) {
      dispatch(getPopularMoviesByDate({ start_date, end_date }));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].target.lastChild && !isMoviesLoading) {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          getPopularMoviesAndShowsByDate(start_date, 30);
        }
      }
    });
    if (isMoviesLoading) return;
    if (observer) observer.disconnect();
    if (lastItemRef.current) {
      observer.observe(lastItemRef?.current);
    }
  }, [isMoviesLoading, lastItemRef.current]);

  function parseDate(dateStr: string) {
    // Extract the year, month, and day from the date string
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(dateStr.substring(6, 8), 10);

    // Create and return the Date object
    return new Date(year, month, day);
  }

  function convertoYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  function getPopularMoviesAndShowsByDate(
    start_date: number,
    daysMinus: number
  ) {
    const date = parseDate(start_date.toString());

    date.setDate(date.getDate() - daysMinus);

    if (date.getTime() <= -8640000000000000) {
      console.log(
        "Reached the earliest possible date. Stopping further subtraction."
      );
      return setNoDataFound(true); // Indicate that no further subtraction is possible
    }

    setNoDataFound(false);
    const formattedDate = convertoYYYMMDD(date);

    dispatch(setDate({ formattedDate, start_date }));
    dispatch(
      getPopularMoviesByDate({
        start_date: formattedDate,
        end_date: start_date,
      })
    );
    return true;
  }

  const NoDataFound = () => (
    <p style={{ textAlign: "center" }}>
      <b>Yay! You have seen it all</b>
    </p>
  );

  return (
    <React.Fragment>
      <div className="gridmovie__section">
        <div className="flex" style={{ marginBottom: "1rem" }}>
          <h3 className="section__title">{"Movies"}</h3>
          {/* {!isMoviesLoading && (
            <Pagination currentPage={index} totalPages={data?.total_pages} />
          )} */}
        </div>
        <div className="gridmovie__grid">
          {data &&
            data.results?.map(
              (movie: Result) =>
                movie?.poster_url &&
                movie?.title && (
                  <PopularMovieCard
                    ref={lastItemRef}
                    id={movie?.id}
                    poster_path={movie?.poster_url}
                    original_title={movie?.title}
                  />
                )
            )}
        </div>
        {isMoviesLoading && <Loader />}
        {noDataFound && <NoDataFound />}
      </div>
    </React.Fragment>
  );
};

export default PopularMoviesSection;
