import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {UserContext} from "../context/userContext.js"

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState("");
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext) //useContext deki setCurrentUser

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => { //userControllers da ki hata mesajlarını getirme
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData)
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section>
      <div className="container">
        <div className="box-div">
          <div className="box-login">
            <h2 className="sign-up-text">Sign In</h2>
            <form className="form register__form" onSubmit={loginUser}>
              {error && <p className="form__error-message">{error}</p>}
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
              <button type="submit" className="signUp-button">
                Login
              </button>
            </form>
            <span className="forward">Don't you have an account?</span>&nbsp;&nbsp;
            <Link to="/signup" className="login">Sign Up</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
