import React, { useEffect } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getTopRatedMoviesByDate, setDate } from "./TopRatedMoviesSlice";
import Loader from "../../ui/Loader";
import { Result } from "../../../utils/types";
// import Pagination from "../../ui/Pagination";
import { TopRatedMovieCard } from "../../ui/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const TopTRatedMoviesSection = () => {
  const { index, data, isMoviesLoading, start_date, end_date } = useAppSelector(
    (state) => state.toprated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopRatedMoviesByDate({ start_date, end_date }));
  }, []);
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

  function getTopMoviesAndShowsByDate(
    start_date: number,
    end_date: number,
    daysMinus: number
  ) {
    const date = parseDate(start_date.toString());

    date.setDate(date.getDate() - daysMinus);

    const formattedDate = convertoYYYMMDD(date);

    dispatch(setDate({ formattedDate, start_date }));
    dispatch(
      getTopRatedMoviesByDate({
        start_date: formattedDate,
        end_date: start_date,
      })
    );
  }

  return (
    <React.Fragment>
      <div className="gridmovie__section">
        <div className="flex" style={{ marginBottom: "1rem" }}>
          <h3>{"TopRated Movies"}</h3>
          {/* {!isMoviesLoading && (
            <Pagination currentPage={index} totalPages={data?.total_pages} />
          )} */}
        </div>
        <InfiniteScroll
          dataLength={data.results?.length as number}
          next={() => {
            getTopMoviesAndShowsByDate(start_date, end_date, 30);
          }}
          hasMore={true}
          loader={<Loader />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {/* {isMoviesLoading ? (
            <Loader />
          ) : ( */}
          <div className="gridmovie__grid">
            {data &&
              data.results?.map(
                (movie: Result) =>
                  movie?.poster_url &&
                  movie?.title && (
                    <TopRatedMovieCard
                      id={movie?.id}
                      poster_path={movie?.poster_url}
                      original_title={movie?.title}
                    />
                  )
              )}
          </div>
          {/* )} */}
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default TopTRatedMoviesSection;
