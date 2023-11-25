import React, { useState, useEffect } from "react";
import { PaginationProps } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";
import { setPopularCurrentPage } from "../../Sections/PopularMoviesSection/PopularMoviesSlice";
import "./index.css";
import { setTopRatedCurrentPage } from "../../Sections/TopRatedMoviesSection/TopRatedMoviesSlice";
const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const [current, setCurrent] = useState<number>(currentPage);
  const [paginationList, setPaginationList] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current === 1) {
      setPaginationList([current, current + 1, current + 2, totalPages]);
    } else if (current > 1) {
      setPaginationList([current - 1, current, current + 1, totalPages]);
    } else if (current === totalPages && current !== 0) {
      setPaginationList([current - 3, current - 2, current - 1, current]);
    }
  }, [current >= 1]);

  const handlePrevClick = () => {
    setCurrent(current - 1);
    window.location.pathname === "/popular"
      ? dispatch(setPopularCurrentPage(current - 1))
      : dispatch(setTopRatedCurrentPage(current - 1));
  };

  const handleNextClick = () => {
    setCurrent(current + 1);
    window.location.pathname === "/popular"
      ? dispatch(setPopularCurrentPage(current + 1))
      : dispatch(setTopRatedCurrentPage(current + 1));
  };

  return (
    <React.Fragment>
      {paginationList.length ? (
        <div className="flex pagination__section">
          {current !== 1 ? (
            <button className="leftpage__arrow" onClick={handlePrevClick}>
              {"<"}
            </button>
          ) : null}
          {current === paginationList[0] ? (
            <span className=" page__link page__link__active">
              {paginationList[0]}
            </span>
          ) : (
            <span className="page__link">{paginationList[0]}</span>
          )}
          ,
          {current === paginationList[1] ? (
            <span className=" page__link page__link__active">
              {paginationList[1]}
            </span>
          ) : (
            <span className="page__link">{paginationList[1]}</span>
          )}
          ,
          {current === paginationList[2] ? (
            <span className="page__link page__link__active">
              {paginationList[2]}
            </span>
          ) : (
            <span className="page__link">{paginationList[2]}</span>
          )}
          ,
          {current === paginationList[3] ? (
            <span className="page__link  page__link__active">
              ...{paginationList[3]}
            </span>
          ) : (
            <span className="page__link">...{paginationList[3]}</span>
          )}
          {current !== totalPages ? (
            <button className="rightpage__arrow" onClick={handleNextClick}>
              {">"}
            </button>
          ) : null}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Pagination;
