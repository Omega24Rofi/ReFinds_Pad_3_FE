"use client";
import React, { useState } from "react";
import "../../../globals.css";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";



const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted");

  try {
    const response = await api.post('${process.env.NEXT_PUBLIC_API_URL}/api/login', {
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
    <div className="bg-lightbg min-h-screen h-screen flex sm:flex-col md:flex-row items-center justify-center w-full">
      <div className="flex-nowrap relative -top-60 sm:block md:hidden h-1/3 colorcard w-full bg-login-gradient2 flex flex-row items-center justify-center rounded-3xl">
          <span className="flex mt-16 justify-evenly">
            <img
              src="/images/Logo-White.svg"
              alt="Refinds Logo"
              className="w-1/4 mx-auto"
            />
            <img
              src="/images/text-logosvg.svg"
              alt="Refinds Logo"
              className="w-2/5 mx-auto"
            />
          </span>
      </div>

      <div className="sm:relative z-50 sm:-top-72 md:top-0 sm:w-[80%] md:w-2/3 sm:h-1/3 md:h-3/4 bg-white flex flex-row rounded-3xl shadow-2xl sm:justify-end md:justify-start">
        <div className="longside sm:w-full md:w-2/3 sm:p-2 md:p-8 my-auto">
          <h1 className="font-bold sm:text-3xl md:text-2xl mb-4 ml-7">Login</h1>
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
              <Link href="/register" className="text-blue-600">
                Yuk!
              </Link>
            </p>

            <br />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            
          </form>
        </div>
        <div className="sm:hidden  colorcard w-1/3 bg-login-gradient md:flex items-center justify-center rounded-3xl">
          <img
            src="/images/Logo-White.svg"
            alt="Refinds Logo"
            className="sm:w-1/5 md:w-2/5"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
