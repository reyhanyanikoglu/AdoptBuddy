import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/signup`,
        userData
      );
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser) {
        setError("Couldn't sign up. Please try again.");
      }
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="box-div">
          <div className="box">
            <h2 className="sign-up-text">Sign Up</h2>
            <form className="form register__form" onSubmit={signupUser}>
              {error && <p className="form__error-message">{error}</p>}
              <input
                className="sign-input"
                type="text"
                placeholder="Full Name"
                name="name"
                value={userData.name}
                onChange={changeInputHandler}
              />
              <input
                className="sign-input"
                type="text"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
              />
              <input
                className="sign-input"
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
              />
              <input
                className="sign-input"
                type="password"
                placeholder="Confirm password"
                name="checkPassword"
                value={userData.checkPassword}
                onChange={changeInputHandler}
              />
              <button type="submit" className="signUp-button">
                Sign Up
              </button>
            </form>
            <span className="forward">Do you already have an account?</span>
            &nbsp;&nbsp;
            <Link to="/login" className="login">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
