// Pengguna meminta verifikasi akun. Sistem akan membuat token dan mengirimkan email ke pengguna berisi link verifikasi 
// (http://localhost:3000/verify_account/{id_user}).
// Pengguna klik link tersebut yang membawa mereka ke halaman Next.js verify_account/[token].js.
// Frontend Next.js akan mengirimkan token ke backend Laravel melalui API (POST /api/account/verify).
// Backend memverifikasi token dan mengubah status akun pengguna jika token valid.
"use client";
// import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const VerifyAccount = ({ params }) => {
  // const router = useRouter();
  const { id_user } = params; // Mendapatkan id_user dari query params
  const [status, setStatus] = useState(""); // Untuk menampilkan status (loading, sukses, atau error)
  const [isLoading, setIsLoading] = useState(false); // Untuk menangani status loading

  // Fungsi untuk memulai proses verifikasi
  const handleVerification = async () => {
    if (!id_user) {
      setStatus("ID user tidak ditemukan.");
      return;
    }

    setIsLoading(true);
    setStatus("Verifying...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account/verify`,
        { id_user }
      );

      // Menampilkan pesan sukses jika verifikasi berhasil
      setStatus(response.data.message || "Akun berhasil diverifikasi.");
    } catch (error) {
      // Menampilkan pesan error jika terjadi kesalahan saat verifikasi
      setStatus(
        error.response?.data?.message || "Verifikasi gagal. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false); // Mengubah status loading ke false setelah proses selesai
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Verifikasi Akun</h1>

      {/* Status message */}
      <p className={`mb-4 ${isLoading ? "text-gray-500" : "text-mainblue"}`}>
        {status}
      </p>

      {/* Tombol untuk memulai verifikasi */}
      <button
        type="button"
        onClick={handleVerification}
        disabled={isLoading}
        className="px-6 py-2 bg-blue_btn text-white rounded-lg hover:bg-blue_btn_hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Verifikasi..." : "Verifikasi Akun"}
      </button>
    </div>
  );
};

export default VerifyAccount;
