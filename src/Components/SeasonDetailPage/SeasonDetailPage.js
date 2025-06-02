import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SeasonDetailPage.css";
import Header from "../Header/Header";
import axios from "axios";
import { useSelector } from "react-redux";

const SeasonDetailPage = () => {
  const { series_id, season_number } = useParams();

  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seasonDetailUrl = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?language=en-US`;
  const bearerToken = useSelector((state) => state.user.bearerToken);

  const fetchSeasonDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(seasonDetailUrl, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      setSeasonDetails(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch season details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchSeasonDetail();
  }, [series_id, season_number]);

  if (loading) {
    return (
      <div className="season-detail-page">
        <Header />
        <div className="season-detail-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="season-detail-page">
        <Header />
        <div className="season-detail-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="season-detail-page">
      <Header />
      <div className="season-detail-header">
        <h2>{seasonDetails.name} - Season {seasonDetails.season_number}</h2>
        <p>{seasonDetails.overview}</p>
      </div>
      <div className="season-detail-episode-list">
        <h3>Episodes:</h3>
        {seasonDetails.episodes.map((episode) => (
          <div key={episode.id} className="season-detail-episode">
            <h4>{episode.name}</h4>
            <p>{episode.overview}</p>
            <p><strong>Air Date:</strong> {episode.air_date}</p>
            <p><strong>Episode Duration:</strong> {episode.runtime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetailPage;
