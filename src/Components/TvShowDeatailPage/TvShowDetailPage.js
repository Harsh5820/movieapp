import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TvShowDetailPage.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";

const TvShowDetailPage = () => {
  const { series_id } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerToken = useSelector((state) => state.user.bearerToken);

  // Fetch TV Show details
  useEffect(() => {
    const fetchTvShowDetails = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/tv/${series_id}?language=en-US`;
      try {
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });
        setTvShowDetails(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch TV show details. Please try again later.");
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchTvShowDetails();
  }, [series_id, bearerToken]);

  const {
    poster_path,
    name,
    tagline,
    vote_average,
    overview,
    number_of_seasons,
    number_of_episodes,
    genres = [],
    seasons = [],
  } = tvShowDetails;

  // Loading state
  if (loading) {
    return (
      <div className="tvshow-detail-page">
        <Header />
        <div className="loading-message">Loading TV Show Details...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="tvshow-detail-page">
        <Header />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="tvshow-detail-page">
      <div className="tvshow-detail-page-header">
        <Header />
      </div>

      <div className="tvshow-detail-page-heading">
        <div className="tvshow-detail-page-heading-poster">
          {poster_path && (
            <img
              className="tvshow-detail-page-heading-img"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={name}
            />
          )}
        </div>

        <div className="tvshow-detail-page-heading-information">
          <div className="tvshow-detail-page-heading-title">{name}</div>
          <div className="tvshow-detail-page-heading-tagline">{tagline}</div>

          <div className="tvshow-rating-bar-container">
            <div className="tvshow-rating-bar">
              <div
                className="tvshow-rating-bar-fill"
                style={{ width: `${(vote_average / 10) * 100}%` }}
              />
            </div>
            <div className="tvshow-vote">{vote_average}</div>
          </div>

          <div className="tvshow-detail-page-heading-overview">{overview}</div>
          <div className="tvshow-detail-page-heading-total-seasons">
            Total seasons: {number_of_seasons}
          </div>
          <div className="tvshow-detail-page-heading-episode-count">
            Total episodes: {number_of_episodes}
          </div>

          <div className="tvshow-detail-page-heading-genre">
            Genres:
            {genres.map((genre) => (
              <p key={genre.id}>&nbsp;{genre.name}&nbsp;</p>
            ))}
          </div>
        </div>
      </div>

      <div className="tvshow-deatil-page-seasons-card-container">
        {seasons.map((season) => (
          <Link
            to={`/tv/${series_id}/season/${season.season_number}`}
            key={season.id}
            className="tvshow-detail-page-season-card"
          >
            <div className="tvshow-detail-page-season-card-img-box">
              {season.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  alt={`${name} ${season.name}`}
                  className="tvshow-detail-page-season-card-img"
                />
              )}
            </div>
            <div className="tvshow-detail-page-season-card-title">
              {season.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TvShowDetailPage;
