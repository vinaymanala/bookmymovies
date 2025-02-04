import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks";
import "./index.css";
import { RootState } from "../../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, setIsLoading } from "./MovieDetailsSlice";
import Loader from "../../ui/Loader";

const MovieDetailsSection = () => {
  const { isLoading, movie } = useAppSelector(
    (state: RootState) => state.movie
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id }: any = useParams();
  const [movieId, setMovieId] = useState<number | null>(parseInt(id));

  useEffect(() => {
    // fetch movie details based on id
    window.scrollTo(0, 0);
    setIsLoading(true);
    dispatch(getMovieDetails(movieId));
    return () => {
      setMovieId(null);
      // dispatch(getMovieDetails(null));
    };
  }, []);

  const MovieCard = () => {
    return (
      <React.Fragment>
        <div className="moviedetails__card">
          <img src={movie?.poster} alt={movie?.original_title} />
        </div>
      </React.Fragment>
    );
  };

  const MovieDetails = () => {
    return (
      <div className="moviedetails__details">
        <h3 className="details__title">{movie?.original_title}</h3>
        <div className="details__info">
          <div>
            {movie?.user_rating && movie?.user_rating ? (
              <div className="ratings__info">
                {movie?.user_rating !== null && (
                  <h3 className="">
                    Vote :{" "}
                    <span className="number__info">
                      {/* {(movie.critic_score * 10).toFixed(2)}% */}
                      {Math.floor(movie?.user_rating)}/10
                    </span>
                  </h3>
                )}
                {movie?.relevance_percentile !== null && (
                  <h3 className="">
                    Popularity :{" "}
                    <span className="number__info">
                      {movie?.relevance_percentile.toFixed(2)}%
                      {/* {((movie.popularity % 1000) / 10).toFixed(2)}% */}
                    </span>
                  </h3>
                )}
              </div>
            ) : null}
          </div>
          <div className="genre__info">
            Genre:
            {movie?.genre_names &&
              movie?.genre_names.map((genre, id: number) => (
                <span key={id}>{genre}</span>
              ))}
          </div>

          <div className="language__info">
            Available in:{" "}
            {/* {movie?.spoken_languages.map((lang, id: number) => (
              <span key={id}>{lang?.name}</span>
            ))} */}
            {movie?.original_language}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn"
            onClick={() => {
              navigate(`/movie/${id}/booking`);
            }}
          >
            Book Now
          </button>
          <button className="btn">
            <a
              href={`https://www.imdb.com/title/${movie?.imdb_id}`}
              target="_blank"
            >
              Imdb
            </a>
          </button>
        </div>
      </div>
    );
  };

  const AboutMovieContainer = () => {
    return (
      <div className="moviedetails__about__container">
        <div className="moviedetails__about__section">
          {movie?.plot_overview && (
            <h4 className="details__title"> what's the plot?</h4>
          )}
          {movie?.plot_overview && (
            <div className="moviedetails__about__paragraph">
              {movie?.plot_overview}
            </div>
          )}
        </div>
      </div>
    );
  };
  const BannerLoader = () => {
    return (
      <div
        className="moviedetails__banner"
        style={{ height: "620px", backgroundColor: "var(--ternaryColor)" }}
      >
        <Loader />
      </div>
    );
  };
  const MovieCardDetailsLoader = ({ children }: any) => {
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
      const timerId = setTimeout(() => {
        setIsShown(true);
        // console.log(isShown);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }, []);
    return <>{isShown && children}</>;
  };

  const MovieBanner = () =>
    movie?.backdrop ? (
      <img
        className="moviedetails__banner"
        src={movie?.backdrop}
        // src={`https://image.tmdb.org/t/p/original/${movie?.backdrop}`}
      />
    ) : (
      <img
        className="moviedetails__nobanner"
        src={movie?.poster}
        // src={`https://image.tmdb.org/t/p/original/${movie?.poster}`}
        alt={movie?.original_title}
      />
    );

  const MovieDetailsContainer = () =>
    movie?.original_title && (
      <div className="moviedetails__container">
        <MovieCard />
        <MovieDetails />
      </div>
    );
  return (
    <div className="moviedetails__section">
      {/* <button className="left__arrow">{"<"}</button> */}
      <Link to={"/"} className="arrow" style={{ fontSize: "small" }}>
        {"< "}Back
      </Link>
      {isLoading ? (
        <BannerLoader />
      ) : (
        <>
          <MovieBanner />
          <MovieCardDetailsLoader>
            <MovieDetailsContainer />
          </MovieCardDetailsLoader>
          {/* {movie?.original_title && (
            <div className="moviedetails__container">
              <MovieCard />
              <MovieDetails />
            </div>
          )} */}
        </>
      )}
      <AboutMovieContainer />
    </div>
  );
};

export default MovieDetailsSection;
