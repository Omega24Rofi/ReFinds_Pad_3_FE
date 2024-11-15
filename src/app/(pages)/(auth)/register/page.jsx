"use client";

import React from "react";
import "../../../globals.css";
import Image from "next/image";

//
import { useState } from "react";
import api from "@/utils/axios";
import Link from "next/link";

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
    e.preventDefault(); // Mencegah default refrsh

    try {
      // mengirim data menggunakan axios ke API
      // menunggu response dari exios
      const response = await api.post("http://localhost:8000/api/register", {
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
    <div className="bg-lightbg min-h-screen h-screen flex items-center justify-center">
      <div className="container w-2/3  h-[90%] bg-white flex items-start rounded-3xl shadow-2xl">
        <div className="logside w-2/3 p-8">
          <h1 className="font-bold text-2xl mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-4">
              Email
              <input
                type="email"
                placeholder="email"
                className="border p-2 w-full mt-2 rounded-full"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label htmlFor="password" className="block mb-4 ">
              Password
              <input
                type="password"
                placeholder="password"
                className="border p-2 w-full mt-2 rounded-full"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label htmlFor="passwordConfirmation" className="block mb-4 ">
              Konfirmasi password
              <input
                type="password"
                placeholder="Konfirmasi password"
                className="border p-2 w-full mt-2 rounded-full"
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
                className="border p-2 w-full mt-2 rounded-full"
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
                className="border p-2 w-full mt-2 rounded-full"
                id="namaAsliUser"
                value={namaAsliUser}
                onChange={(e) => setNamaAsliUser(e.target.value)}
                required
              />
            </label>

            {/* tombol register */}
            <div className="w-full flex justify-center">
            <button
              type="submit"
              className="my-2 bg-mainblue text-white py-2 px-6 rounded-xl">
              Register
            </button>
            </div>
            <p className="text-center">
              Sudah punya akun? Login{' '}
              <Link href="/login" className="text-blue-600">
                Yuk!
              </Link>
            </p>
            
            <br />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="colorcard w-1/3 h-full bg-login-gradient rounded-3xl p-0 flex justify-center align-middle">
            <img
            src="/images/Logo-White.svg"
            alt="Refinds Logo"
            className="w-2/5 h-auto"
          />
        </div>

        
      </div>
      
    </div>
  );
};

export default Register;
