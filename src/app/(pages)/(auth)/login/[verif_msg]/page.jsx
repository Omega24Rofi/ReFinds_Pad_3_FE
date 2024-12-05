"use client";
import React, { useState, useEffect } from "react";
import "../../../../globals.css";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
// import Linkify from "react-linkify";

const Login = ({ params }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [id_user, setIdUser] = useState(null); // Menyimpan id_user jika dibutuhkan

  const { verif_msg } = params; // Mendapatkan verif_msg dari query params

  // Fungsi untuk mendekode URL yang ter-encode
  const decodeUrl = (text) => {
    try {
      const correctedText = text.replace(/\+/g, " ");
      return decodeURIComponent(correctedText); // Decode URL
    } catch (e) {
      return text; // Jika gagal, kembalikan teks mentah
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted");

  try {
    const response = await api.post("http://localhost:8000/api/login", {
      email,
      password,
    });

    // Cek apakah respons mengandung token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
      setError("");
      router.push("/"); // Redirect ke halaman utama
    }
  } catch (error) {
    console.log(error);

    // Jika respons adalah 403 (akun belum diverifikasi)
    if (error.response?.status === 403) {
      const { id_user } = error.response.data; // Ambil id_user dari respons
      router.push(`/verifikasi_akun/${id_user}`); // Redirect ke halaman verifikasi
    } else {
      // Tampilkan pesan error lainnya
      setError(
        error.response?.data?.message || "Login failed: Invalid credentials"
      );
      setMessage("");
    }
  }
};


  return (
    <div className="bg-lightbg min-h-screen h-screen flex items-center justify-center w-full">
      <div className="container w-2/3 h-3/4 bg-white flex rounded-3xl shadow-2xl">
        <div className="logside w-2/3 p-8">
          <h1 className="font-bold text-2xl mb-4 ml-7">Login</h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <div>
              {/* Tampilkan pesan hasil verifikasi */}
              {verif_msg && (
                <div className="text-green-500 mb-4 p-2 border border-green-500 rounded-lg">
                  {decodeUrl(decodeUrl(verif_msg))}
                </div>
              )}
            </div>
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
              className="my-4 bg-mainblue text-white py-2 px-4 rounded-xl w-1/6"
            >
              Login
            </button>

            <p>
              Belum punya akun? Register{" "}
              <Link href="/register" className="text-blue-600">
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
