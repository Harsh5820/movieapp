import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.location.href === "http://localhost:3000/") {
      return false;
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="header">
      <button onClick={handleBack} className="header-back-btn">
        &lt;
      </button>
    </div>
  );
};

export default Header;
