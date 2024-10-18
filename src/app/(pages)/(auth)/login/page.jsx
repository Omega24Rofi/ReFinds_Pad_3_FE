"use client";
import React, { useState } from "react";
import "../../../globals.css";
import Image from "next/image";
import Link from "next/link";

// be
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
  
    try {
      console.log("TRY");
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
  
      // Check if the response contains a token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful");
        setError("");
      } else {
        setError("Login failed: Invalid credentials");
        setMessage("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display backend error message
      } else {
        setError("Login failed"); // Fallback error message
      }
      setMessage("");
      console.error("Login error:", err); // Log the error details
    }
  
  
  };

  return (
    <div className="bg-lightbg min-h-screen h-screen flex items-center justify-center w-full">
      <div className="container w-2/3 h-3/4 bg-white flex rounded-3xl shadow-2xl">
        <div className="logside w-2/3 p-8">
          <h1 className="font-bold text-2xl mb-4 ml-7">Login</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
            <label htmlFor="email" className="block mb-4 w-[90%]">
              Email
              <input
                type="email"
                id="email"
                className="border-2 p-2 w-full mt-2 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password" className="block mb-4 w-[90%]">
              Password
              <input
                type="password"
                id="password"
                className="border-2 p-2 w-full mt-2 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="my-4 bg-mainblue text-white py-2 px-4 rounded-xl w-1/6">
              Login
            </button>

            <p>
              Belum punya akun? Register{' '}
              <Link href="/auth/register" className="text-blue-600">
                Yuk!
              </Link>
            </p>

            <br />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            
          </form>
        </div>
        <div className="colorcard w-1/3 bg-login-gradient flex items-center justify-center rounded-3xl">
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
