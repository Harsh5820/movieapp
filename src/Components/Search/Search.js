import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import "./Search.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const searchRef = useRef();
  const [searchArray, setSearchArray] = useState([]);
  const [error, setError] = useState(null);
  const bearerToken = useSelector((state) => state.user.bearerToken);

  const fetchSearchText = async (e) => {
    e.preventDefault();

    const query = searchRef.current?.value.trim();
    if (!query) return;

    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

    try {
      const { data } = await axios.get(searchUrl, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      setSearchArray(data.results || []);
      setError(null);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch search results. Please try again.");
    }
  };

  return (
    <div className="search-page">
      <div className="search-page-header">
        <Header />
      </div>

      <div className="home-search-container">
        <form onSubmit={fetchSearchText}>
          <input
            ref={searchRef}
            className="home-search-box"
            type="text"
            placeholder="Search for Movies, TV shows, People and more"
          />
          <input
            className="home-search-submit-btn"
            type="submit"
            value="Search"
          />
        </form>
      </div>

      <div className="trending-movies-container">
        {error ? (
          <div className="search-page-error">{error}</div>
        ) : searchArray.length === 0 ? (
          <div className="search-page-empty">Search for some content!</div>
        ) : (
          searchArray.map((movie) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
