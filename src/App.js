import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import MovieDetailpage from "./Components/MovieDetailPage/MovieDetailPage";
import Discover from "./Components/Discover/Discover";
import TvShowDetailPage from "./Components/TvShowDeatailPage/TvShowDetailPage";
import SeasonDetailPage from "./Components/SeasonDetailPage/SeasonDetailPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./utils/useslice";
import WatchlistPage from "./Components/WatchlistPage/WatchlistPage";
import Search from "./Components/Search/Search";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(login(user));
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <>
      <Router>
        <div className="app-route">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movie_id" element={<MovieDetailpage />} />
            <Route path="/tv/:series_id" element={<TvShowDetailPage />} />
            <Route
              path="/tv/:series_id/season/:season_number"
              element={<SeasonDetailPage />}
            />
            <Route path="/discover" element={<Discover />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/watchlist" element={<WatchlistPage/>} />
            <Route path="/search" element={<Search/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
