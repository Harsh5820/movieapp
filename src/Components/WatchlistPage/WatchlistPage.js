import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./WatchlistPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WatchlistPage = () => {
  const watchlistMovieUrl = `https://api.themoviedb.org/3/account/21917026/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;
  const [watchlistMovieArray, setWatchlistMovieArray] = useState([]);
  const bearerToken = useSelector((state) => state.user.bearerToken);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(watchlistMovieUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setWatchlistMovieArray(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="watchlist-page">
      <div className="watchlist-page-header">
        <Header />
      </div>

      <div className="trending-movies-container">
        {watchlistMovieArray?.map?.((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="trending-movie-card"
          >
            <div className="trending-movie-card-img-box">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="trending-movie-card-img"
              />
            </div>
            <div className="trending-movie-card-title">{movie.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
