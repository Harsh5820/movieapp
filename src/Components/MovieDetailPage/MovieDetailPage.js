import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetailPage.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";

const MovieDetailPage = () => {
  const { movie_id } = useParams();
  const movieIdNum = Number(movie_id);

  const [movieDetails, setMovieDetails] = useState({});
  const [inWatchlist, setInWatchlist] = useState(false);

  const movieIds = useSelector((state) => state.user.movieInWatchlistId);
  const bearerToken = useSelector((state) => state.user.bearerToken);

  const genreArray = movieDetails.genres;
  const languageArray = movieDetails.spoken_languages;

  useEffect(() => {
    if (!bearerToken || !movie_id) return;

    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
          {
            headers: { Authorization: `Bearer ${bearerToken}` },
          }
        );
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
    setInWatchlist(movieIds.includes(movieIdNum));
  }, [movieIds, movie_id, bearerToken]);

  const handleWatchlist = async () => {
    try {
      const body = {
        media_type: "movie",
        media_id: movieIdNum,
        watchlist: !inWatchlist,
      };

      const response = await axios.post(
        "https://api.themoviedb.org/3/account/21917026/watchlist",
        body,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Watchlist updated:", response.data);
      setInWatchlist((prev) => !prev);
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-page-header">
        <Header />
      </div>

      <div className="movie-detail-page-main">
        <div className="movie-detail-img-box">
          {movieDetails.poster_path && (
            <img
              className="movie-detail-img"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}
        </div>

        <div className="movie-detail-information">
          <div className="movie-detail-header">
            <div className="movie-detail-header-title">{movieDetails.title}</div>
            <button
              className={`movie-detail-header-watchlist-btn ${
                inWatchlist ? "inwatchlist" : "outwatchlist"
              }`}
              onClick={handleWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          <div className="movie-detail-header-desc">
            {movieDetails.release_date && (
              <>
                {movieDetails.release_date} |
                {movieDetails.runtime &&
                  ` ${Math.floor(movieDetails.runtime / 60)} hrs ${movieDetails.runtime % 60} mins |`}
              </>
            )}
            {genreArray?.map((item) => (
              <p key={item.id}>&nbsp;{item.name}&nbsp;</p>
            ))}
          </div>

          <div className="rating-bar-container">
            <div className="rating-bar">
              <div
                className="rating-bar-fill"
                style={{
                  width: `${(movieDetails.vote_average / 10) * 100}%`,
                }}
              />
            </div>
            <div className="movie-detail-vote">{movieDetails.vote_average}</div>
          </div>

          {movieDetails.tagline && (
            <div className="movie-detail-header-tagline">{movieDetails.tagline}</div>
          )}

          <div className="movie-detail-header-overview">
            <div className="overview-title">Details</div>
            <div className="movie-detail-header-overview-desc">
              {movieDetails.overview}
            </div>
          </div>

          <div className="movie-detail-status-lan">
            <div className="movie-detail-status">
              <p>Status</p>
              <p>{movieDetails.status}</p>
            </div>
            <div className="movie-detail-language">
              <span>Language</span>
              <p>
                {languageArray?.map((item, index) => (
                  <span key={index}>{item.english_name}&nbsp;</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
