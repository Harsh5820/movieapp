import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

const Navbar = () => {

  // const authUrl = `https://api.technilesh.com/api/v1/users/login`;
  const bearerToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTc2ZTc4OGMwOGRlODgyZDUwZWEwZDc4MDlmZGYzNCIsIm5iZiI6MTc0MzQwMDk0MC4xMTAwMDAxLCJzdWIiOiI2N2VhMmZlYzk4M2YxYWVmYzdlNTU0ZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Fj8MhzwkRSJiOASbCNigpi009Rr2E34qm-qSYqcgTZM";

  // const handleAuth = async() => {
  //   try {
  //     const response = await axios.get(authUrl, {
  //       headers: {Authorization: `Bearer ${bearerToken}`}
  //     })
  
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div className="navbar">
      <Link to='/' className="navbar-title-link" >HMDB</Link>
      <div className="navbar-navigation">
        <li className="navbar-list">
          <Link to='/' className="navbar-link">Home</Link>
        </li>
        <li className="navbar-list">
          <Link to='/discover' className="navbar-link">Discover</Link>
        </li>
        <li className="navbar-list">
          <Link to='/watchlist' className="navbar-link">Watchlist</Link>
        </li>
        <li className="navbar-list">
          <Link to='/tv' className="navbar-link">TV</Link>
        </li>
        <li className="navbar-list">
          <Link to='/People' className="navbar-link">People</Link>
        </li>
      </div>
      <div className="navbar-footer">
        <Link to='#' className="navbar-logout-link" >
          <IoIosLogOut />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
