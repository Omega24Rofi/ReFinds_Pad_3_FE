"use client";

import useAuth from '@/app/hooks/useAuth';

const HalamanX = () => {

  // object destructuring , mengambil parameter user dan parameter loading dari hasil menjalankan fungsi useAuth
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;  // Menampilkan loading saat data masih diambil
  }

  return (
    <div>
      <h1>Halaman X</h1>

      {/* Contoh penggunaan */}

        {/* Jika user ada, tampilkan foto profil */}
        {user ? (
          <div>
            <p>Selamat datang, {user.nama_akun}!</p>
            <img src={user.profile_picture_url} alt="Foto Profil" />
          </div>
        ) : (
          // Jika user tidak ada, tampilkan tombol login
          <button onClick={() => window.location.href = '/login'}>
            Login
          </button>
        )}
        
    </div>
  );
};

export default HalamanX;
