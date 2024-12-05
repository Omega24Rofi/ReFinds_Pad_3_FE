// Pengguna meminta verifikasi akun. Sistem akan membuat token dan mengirimkan email ke pengguna berisi link verifikasi 
// (http://localhost:3000/verify_account/{id_user}).
// Pengguna klik link tersebut yang membawa mereka ke halaman Next.js verify_account/[token].js.
// Frontend Next.js akan mengirimkan token ke backend Laravel melalui API (POST /api/account/verify).
// Backend memverifikasi token dan mengubah status akun pengguna jika token valid.
"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const VerifyAccount = ({ params }) => {
  const { id_user } = params; // Mendapatkan id_user dari query params
  const [status, setStatus] = useState(""); // Untuk menampilkan status (loading, sukses, atau error)
  const [isLoading, setIsLoading] = useState(false); // Untuk menangani status loading
  const [isVerified, setIsVerified] = useState(false); // Untuk status verifikasi berhasil

  // Fungsi untuk memulai proses verifikasi
  const handleVerification = async () => {
    if (!id_user) {
      setStatus("ID user tidak ditemukan.");
      return;
    }

    setIsLoading(true);
    setStatus("Mengirim email verifikasi...");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/send-verification-token/${id_user}`,
        {}
      );

      // Menampilkan pesan sukses jika email berhasil dikirim
      if (response.data.result === "success") {
        setStatus(""); // Reset status error or loading
        setIsVerified(true); // Set status verified
      } else {
        setStatus("Verifikasi gagal. Silakan coba lagi.");
      }
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
    <div className="min-h-screen flex items-center">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Verifikasi Akun
      </h1>

      {/* Status message */}
      <p
        className={`mb-4 text-center ${
          isLoading ? "text-gray-500" : "text-mainblue"
        }`}
      >
        {status}
      </p>

      {/* Jika verifikasi sukses, tampilkan pesan success */}
      {isVerified && (
        <div className="p-4 mb-6 bg-green-100 border border-green-400 rounded-md">
          <h2 className="text-lg font-medium text-green-800">
            Link verifikasi akun sudah dikirim ke email Anda.
          </h2>
          <p className="text-sm text-green-700 mt-2">
            Cek email Anda untuk melakukan verifikasi akun. Jangan lupa untuk
            memeriksa folder spam jika tidak menemukan email.
          </p>
        </div>
      )}

      {/* Jika tombol sedang loading, tampilkan progress */}
      <button
        type="button"
        onClick={handleVerification}
        disabled={isLoading}
        className="w-full py-2 mt-4 bg-blue_btn text-white font-semibold rounded-lg hover:bg-blue_btn_hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Mengirim email verifikasi..." : "Kirim Link Verifikasi"}
      </button>
      </div>
      
    </div>
  );
};

export default VerifyAccount;

