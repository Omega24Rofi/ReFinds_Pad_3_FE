import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
/**
 * Hooks ini memiliki fungsi
 *    1. untuk menampilkan komponen tertentu berdasarkan User sudah login atau belum
 *    2. untuk mendapatkan userData yang sudah login
 * token akan di cek 
 * jika ada dan valid maka komponen akan ditampilkan
 * jika tidak ada atau tidak valid
 * 
 */

const useAuth = () => {


  /**
  React Hooks, tepatnya useState

  useState digunakan untuk menyimpan data dalam komponen fungsional.
  userData berfungsi sebagai tempat menyimpan data pengguna.
  setUserData adalah fungsi yang dipanggil untuk mengubah nilai userData.
   */
  const [userDataX, setUserData] = useState(null);  // Menyimpan data user

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Jika token tidak ada, artinya pengguna belum login
    if (!token) {
      return;
    }

    // Jika token ada, verifikasi token dan ambil data pengguna
    const fetchUser = async () => {
      try {
        const response = await api.get('api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);  // Set user jika token valid
        
      } catch (error) {
        // Jika token tidak valid, hapus token
        localStorage.removeItem('token');
      } finally {

      }
    };

    fetchUser();
  }, []);
//   disini berarti antara data pengguna (ada atau tidak ada) dan loading = false
  return { userDataX};  // Kembalikan status user dan loading
};

export default useAuth;


/////// contoh penggunaan 1
// import useAuth from '@/hooks/useAuth';

// const HalamanX = () => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <p>Loading...</p>;  // Menampilkan loading saat data masih diambil
//   }

//   return (
//     <div>
//       <h1>Halaman X</h1>
//       {/* Jika user ada, tampilkan foto profil */}
//       {user ? (
//         <div>
//           <p>Selamat datang, {user.nama_akun}!</p>
//           <img src={user.profile_picture_url} alt="Foto Profil" />
//         </div>
//       ) : (
//         // Jika user tidak ada, tampilkan tombol login
//         <button onClick={() => window.location.href = '/login'}>
//           Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default HalamanX;


//////// contoh penggunaan 2

//   const { userData, loading } = useAuth();

