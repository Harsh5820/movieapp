import React, { useRef } from "react";
import "./LoginPage.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../utils/useslice";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      console.warn("Email and password are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user);
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-page-title">Log In</div>
        <form className="login-page-form" onSubmit={handleSubmit}>
          <label className="login-page-form-label" htmlFor="email">Email</label>
          <br />
          <input
            ref={emailRef}
            className="login-page-form-input"
            id="email"
            type="email"
            placeholder="abc@xyz.com"
            required
          />
          <br />
          <label className="login-page-form-label" htmlFor="password">Password</label>
          <br />
          <input
            ref={passwordRef}
            className="login-page-form-input"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <div className="login-page-login-btn-box">
            <button className="login-page-login-btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
