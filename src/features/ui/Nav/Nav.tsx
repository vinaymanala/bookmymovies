import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../utils/hooks";
import {
  getMoviesByName,
  setIsLoading,
  setQuery,
  setResults,
} from "./SearchSlice";

let timeoutId: any = null;

const Nav = () => {
  const [navEl, setNavEl] = useState<any>(null);
  const controllerRef = useRef<AbortController>();
  const [hamburgerEl, setHamburgerEl] = useState<any>(null);
  const dispatch = useAppDispatch();

  const headerEl = document.querySelector(".header");

  const inputRef: any = useRef();

  // handle scroll on page
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      headerEl?.classList.add("header--scrolled");
    } else if (window.scrollY < 50) {
      headerEl?.classList.remove("header--scrolled");
    }
  });
  const searchText = localStorage.getItem("searchText") || "";
  useEffect(() => {
    setNavEl(document.querySelector(".nav"));
    setHamburgerEl(document.querySelector(".hamburger"));

    hamburgerEl?.addEventListener("click", () => {
      navEl?.classList.toggle("nav--open");
    });
    dispatch(setQuery(searchText));
    // document.querySelector("input")?.setAttribute("value", searchText);

    return () => {
      hamburgerEl?.removeEventListener("click", () => {
        navEl?.classList.toggle("nav--open");
      });
    };
  }, [navEl, searchText]);

  const useDebounce = (func: () => void, delay: number = 2000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };

  const setDispatchSearchCall = (value: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    useDebounce(() => dispatch(getMoviesByName({ value, signal })));
  };

  // handle search movies by keywords
  const handleSearch = async (e: any) => {
    dispatch(setIsLoading(true));
    dispatch(setQuery(e.target.value));

    const { value } = e.target as typeof e.target & {
      value: string;
    };
    localStorage.setItem("searchText", value);
    if (value !== "") {
      setDispatchSearchCall(value);
    } else {
      handleResetQuery();
    }
  };

  const handleResetQuery = () => {
    dispatch(setIsLoading(false));
    dispatch(setResults([]));
    dispatch(setQuery(""));
    document.querySelector("input")?.setAttribute("value", "");
    localStorage.removeItem("searchText");
  };

  const SearchMovies = ({ cls }: { cls: string }) => {
    return (
      <>
        <input
          type="text"
          className={cls}
          placeholder="Search movies..."
          onKeyUp={handleSearch}
          ref={inputRef}
          defaultValue={searchText}
          size={30}
        />
      </>
    );
  };

  return (
    <React.Fragment>
      <header className="header">
        <div className="header__content">
          <Link to="/" className="logo">
            bmym
          </Link>
          {window.location.pathname === "/" ? (
            <SearchMovies cls={"searchbtn"} />
          ) : null}

          <nav className="nav">
            {window.location.pathname === "/" ? (
              <SearchMovies cls={"searchbtn__mobile"} />
            ) : null}
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to={"/"}
                  className={
                    window.location.pathname === "/"
                      ? "nav__link__active"
                      : "nav__link"
                  }
                  onClick={() => handleResetQuery()}
                >
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to={"/popular"}
                  className={
                    window.location.pathname === "/popular"
                      ? "nav__link__active"
                      : "nav__link"
                  }
                >
                  Movies
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to={"/toprated"}
                  className={
                    window.location.pathname === "/toprated"
                      ? "nav__link__active"
                      : "nav__link"
                  }
                >
                  Shows
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hamburger">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Nav;
