import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../images/google.png";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}auth/google/callback`,
      "_self"
    );
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login to your account</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            required
            onChange={handleChange}
          />
          {error && <div>{error}</div>}
          <button type="submit">Sing Up</button>
        </form>
        <p>or</p>
        <button onClick={googleAuth}>
          <img width={16} src={GoogleIcon} alt="google icon" />
          <span>Log in with Google</span>
        </button>
        <p>new user? </p>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
