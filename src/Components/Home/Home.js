import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { replaceMoviesInWatchlist } from "../../utils/useslice";

const Home = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [trendingMovies, setTrendingMovies] = useState([]);

  const dispatch = useDispatch();
  const bearerToken = useSelector((state) => state.user.bearerToken);

  const fetchTrendingMovies = async (window) => {
    const url = `https://api.themoviedb.org/3/trending/movie/${window}?language=en-US`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      setTrendingMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  const fetchWatchlistMovies = async () => {
    const url = `https://api.themoviedb.org/3/account/21917026/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      const ids = data.results?.map((movie) => movie.id) || [];
      dispatch(replaceMoviesInWatchlist(ids));
    } catch (error) {
      console.error("Failed to fetch watchlist movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies(timeWindow);
    fetchWatchlistMovies();
  }, [timeWindow]);

  const handleTimeWindowChange = (window) => setTimeWindow(window);

  return (
    <div className="home">
      <div className="home-search-section">
        <div className="home-search-title">WELCOME.</div>
        <div className="home-search-desc">
          Millions of movies, TV shows and people to discover. Explore now.
        </div>
        <Link to="/search" className="home-search-container">
          <form action="#">
            <input
              className="home-search-box"
              type="text"
              placeholder="Search for Movies, TV shows, People and more"
            />
            <input className="home-search-submit-btn" type="submit" />
          </form>
        </Link>
      </div>

      <div className="home-trending-section">
        <div className="home-trending-header">
          <div className="home-trending-header-title">Trending Movies</div>
          <div className="home-trending-header-navigation">
            {["day", "week"].map((window) => (
              <button
                key={window}
                className={`home-trending-header-btn ${
                  timeWindow === window ? "active-btn" : "inactice-btn"
                }`}
                onClick={() => handleTimeWindowChange(window)}
              >
                {window.charAt(0).toUpperCase() + window.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="trending-movies-container">
          {trendingMovies.map((movie) => (
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
    </div>
  );
};

export default Home;
