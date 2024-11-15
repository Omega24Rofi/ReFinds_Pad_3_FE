"use client";

import useAuth from '@/hooks/useAuth';
import api from "@/utils/axios";


const HalamanX = () => {

  // object destructuring , mengambil parameter user dan parameter loading dari hasil menjalankan fungsi useAuth
  const { userData, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;  // Menampilkan loading saat data masih diambil
  }

  return (
    <div>
      <h1>Halaman X</h1>

      {/* Contoh penggunaan */}

        {/* Jika user ada, tampilkan foto profil */}
        {userData ? (
          <div>
            <p>Selamat datang, {userData.nama_akun}!</p>
            <p>ANDA SUDAH LOGIN</p>
            <img src={userData.profile_picture_url} alt="Foto Profil" />
          </div>
        ) : (

          // Jika user tidak ada, tampilkan tombol login
          <div>
            <p>ANDA BELUM LOGIN</p>
            <button onClick={() => window.location.href = '/login'}>
            Login
          </button>
          <p></p>

          </div>
        )}
        
    </div>
  );
};

export default HalamanX;
