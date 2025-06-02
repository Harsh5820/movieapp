import React, { useEffect, useState } from "react";
import "./Discover.css";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Discover = () => {
  const [includeAdultMovie, setIncludeAdultMovie] = useState(false);
  const [includeAdultTV, setIncludeAdultTV] = useState(false);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [discoverTv, setDiscoverTv] = useState([]);

  const bearerToken = useSelector((state) => state.user.bearerToken);

  useEffect(() => {
    const fetchDiscoverData = async () => {
      const movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=${includeAdultMovie}&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const tvUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=${includeAdultTV}&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`;

      try {
        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(movieUrl, {
            headers: { Authorization: `Bearer ${bearerToken}` },
          }),
          axios.get(tvUrl, {
            headers: { Authorization: `Bearer ${bearerToken}` },
          }),
        ]);

        setDiscoverMovies(moviesResponse.data.results || []);
        setDiscoverTv(tvResponse.data.results || []);
      } catch (error) {
        console.error("Failed to fetch discover data:", error);
      }
    };

    fetchDiscoverData();
  }, [includeAdultMovie, includeAdultTV, bearerToken]);

  return (
    <div className="discover">
      <div className="discover-header">
        <Header />
      </div>

      <div className="discover-heading">
        Discover Movies, TV Shows and much more
      </div>

      <div className="discover-movies-container">
        <div className="discover-movie-header">
          <div className="discover-movie-title">Movies</div>
          <label className="discover-movie-adult-checkbox">
            Include Adult Content
            <input
              className="discover-movie-adult-input"
              type="checkbox"
              checked={includeAdultMovie}
              onChange={() => setIncludeAdultMovie((prev) => !prev)}
            />
          </label>
        </div>

        <div className="trending-movies-container">
          {discoverMovies.map((movie) => (
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

      <div className="discover-movies-container">
        <div className="discover-movie-header">
          <div className="discover-movie-title">TV Shows</div>
          <label className="discover-movie-adult-checkbox">
            Include Adult Content
            <input
              className="discover-movie-adult-input"
              type="checkbox"
              checked={includeAdultTV}
              onChange={() => setIncludeAdultTV((prev) => !prev)}
            />
          </label>
        </div>

        <div className="trending-movies-container">
          {discoverTv.map((tv) => (
            <Link
              to={`/tv/${tv.id}`}
              key={tv.id}
              className="trending-movie-card"
            >
              <div className="trending-movie-card-img-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                  className="trending-movie-card-img"
                />
              </div>
              <div className="trending-movie-card-title">{tv.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
