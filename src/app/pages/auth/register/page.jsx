"use client";

import React from "react";
import "../../../globals.css";
import Image from "next/image";

//
import { useState } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [namaAkun, setNamaAkun] = useState("");
  const [namaAsliUser, setNamaAsliUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // fungsi untuk handle submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from default refresh

    try {
      // mengirim data menggunakan axios ke API
      // menunggu response dari exios
      const response = await axios.post("http://localhost:8000/api/register", {
        nama_akun: namaAkun,
        nama_asli_user: namaAsliUser,
        email, // short syntaxt bc nama var sama
        password,
        password_confirmation: passwordConfirmation,
      });

      // mengambil respons pesan dari BE
      setMessage(response.data.message); // Set success message
      setError(""); // Reset error
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.message || "Terjadi kesalahan, silakan coba lagi.";
        setError(errorMessage);
      } else {
        setError("Terjadi kesalahan, silakan coba lagi.");
      }
      setMessage(""); // Reset success message
    }
  };

  return (
    <div className="bg-lightbg min-h-screen flex items-center justify-center">
      <div className="container w-2/3 h-auto bg-white flex items-start">
        <div className="logside w-2/3 p-8">
          <h1 className="font-bold text-2xl mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-4">
              Email
              <input
                type="email"
                placeholder="email"
                className="border p-2 w-full mt-2"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label htmlFor="password" className="block mb-4">
              Password
              <input
                type="password"
                placeholder="password"
                className="border p-2 w-full mt-2"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label htmlFor="passwordConfirmation" className="block mb-4">
              Password
              <input
                type="password"
                placeholder="setPasswordConfirmation"
                className="border p-2 w-full mt-2"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </label>

            <label htmlFor="username" className="block mb-4">
              Username
              <input
                type="text"
                placeholder="username"
                className="border p-2 w-full mt-2"
                id="namaAkun"
                value={namaAkun}
                onChange={(e) => setNamaAkun(e.target.value)}
                required
              />
            </label>
            <label htmlFor="name" className="block mb-4">
              Name
              <input
                type="text"
                placeholder="name"
                className="border p-2 w-full mt-2"
                id="namaAsliUser"
                value={namaAsliUser}
                onChange={(e) => setNamaAsliUser(e.target.value)}
                required
              />
            </label>

            {/* tombol register */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Register
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

export default Register;
