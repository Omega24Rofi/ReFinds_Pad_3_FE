"use client";
import React from "react";
import "../../../globals.css";
import Image from "next/image";

// be
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password: password,
      });

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      setMessage("Login successful");
      setError("");
    } catch (err) {
      setError("Login failed");
      setMessage("");
    }
  };

  return (
    <div className="bg-lightbg min-h-screen flex items-center justify-center">
      <div className="container w-2/3 h-96 bg-white flex items-start ">
        <div className="logside w-2/3 p-8">
          <h1 className="font-bold text-2xl mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-4">
              Email
              <input
                type="email"
                id="email"
                placeholder="email"
                className="border p-2 w-full mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password" className="block mb-4">
              Password
              <input
                type="password"
                id="password"
                placeholder="password"
                className="border p-2 w-full mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {/* tombol login */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Login
            </button>
            <br />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="colorcard w-1/3 bg-login-gradient h-full flex items-center justify-center">
          <img
            src="/images/Logo-White.svg"
            alt="Refinds Logo"
            className="w-2/5"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
