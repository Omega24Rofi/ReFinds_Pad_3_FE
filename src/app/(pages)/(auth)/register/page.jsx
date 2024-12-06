"use client";

import React from "react";
import "../../../globals.css";
import Image from "next/image";
import { useState } from "react";
import api from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [namaAkun, setNamaAkun] = useState("");
  const [namaAsliUser, setNamaAsliUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [registeredData, setRegisteredData] = useState("");

  const router = useRouter(); // untuk melakukan redirect setelah registrasi berhasil

  // Fungsi untuk handle submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah default refresh

    try {
      // Mengirim data menggunakan axios ke API
      const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
        nama_akun: namaAkun,
        nama_asli_user: namaAsliUser,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // Menyimpan data user yang terdaftar
      setMessage(response.data.message); // Set success message
      setRegisteredData(response.data.user);
      console.log(response.data.user);

      setError(""); // Reset error

      // Menampilkan alert jika registrasi berhasil
      alert(response.data.message || "Registrasi berhasil!");

      // Redirect setelah 2 detik
      setTimeout(() => {
        // Redirect ke halaman verifikasi dengan id_user
        router.push(`/verifikasi_akun/${response.data.user.id_user}`);
      }, 2000); // 2 detik delay sebelum redirect
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
    <div className="bg-lightbg min-h-screen h-screen flex sm:flex-col md:flex-row items-center justify-center w-full">
      <div className="flex-nowrap relative -top-32 sm:block md:hidden h-1/3 colorcard w-full bg-login-gradient2 flex flex-row items-center justify-center rounded-3xl">
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
      <div className="sm:relative z-50 sm:-top-72 md:top-0 sm:w-[80%] md:w-2/3 sm:h-1/2 md:h-[90vh] bg-white flex flex-row rounded-3xl shadow-2xl sm:justify-end md:justify-start">
        <div className="logside sm:w-full md:w-2/3 p-8 mx-auto">
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
                className="my-2 bg-mainblue text-white py-2 px-6 rounded-xl"
              >
                Register
              </button>
            </div>
            <p className="text-center">
              Sudah punya akun? Login{" "}
              <Link href="/login" className="text-blue-600">
                Yuk!
              </Link>
            </p>

            <br />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="colorcard w-1/3 h-full bg-login-gradient rounded-3xl p-0 sm:hidden md:flex justify-center align-middle">
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