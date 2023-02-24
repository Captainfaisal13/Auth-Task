import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Test from "./components/test";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [user1, setUser1] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser1(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  const user = localStorage.getItem("token");

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" element={<Test />} />}
        {user1 && <Route path="/" element={<Test user={user1} />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
