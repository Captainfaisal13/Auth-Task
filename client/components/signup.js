import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../images/google.png";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}auth/google/callback`,
      "_self"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/users";
      // console.log(data);
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
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
          <button type="submit">Sign Up</button>
        </form>
        <p>or</p>
        <button onClick={googleAuth}>
          <img width={16} src={GoogleIcon} alt="google icon" />
          <span>Sing up with Google</span>
        </button>
        <p>already registered? </p>
        <Link to="/login">
          <button>log in</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
