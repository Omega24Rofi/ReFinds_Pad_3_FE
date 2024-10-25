import { useEffect, useState } from "react";
import axios from "axios"; // Pastikan axios diimpor

const useKategori = () => { // Mengubah nama menjadi useKategori untuk mengikuti konvensi hook
  const [kategoriData, setKategoriData] = useState([]); // Proper state untuk menyimpan data kategori
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    const fetchKategoriData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/kategori");
        setKategoriData(response.data); // Memperbarui state dengan data kategori yang diambil
        console.log("Kategori JSON:", response.data); // Log data yang diambil
      } catch (error) {
        console.error("Error fetching data:", error); // Log kesalahan
        setError(error); // Simpan error ke dalam state
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    };

    fetchKategoriData(); // Memanggil fungsi asynchronous untuk mengambil data ketika komponen di-mount
  }, []); // Array dependency kosong untuk menjalankan efek hanya sekali saat komponen di-mount

  return { kategoriData, loading, error }; // Mengembalikan kategori, status loading, dan error
};

export default useKategori;
