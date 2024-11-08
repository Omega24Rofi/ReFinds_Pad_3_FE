import { useEffect, useState } from "react";
import api from "@/utils/axios";
const useKategori = () => { // Mengubah nama menjadi useKategori untuk mengikuti konvensi hook
  const [kategoriData, setKategoriData] = useState([]); // Proper state untuk menyimpan data kategori
  const [subkategoriData, setSubkategoriData] = useState([]); // State untuk menyimpan data subkategori
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    const fetchKategoriData = async () => {
      try {
        const kategoriResponse = await api.get("/api/kategori");
        setKategoriData(kategoriResponse.data); // Memperbarui state dengan data kategori yang diambil
        console.log("use Kategori:", kategoriResponse.data); // Log data yang diambil

        const subkategoriResponse = await api.get("/api/subkategori");
        setSubkategoriData(subkategoriResponse.data); // Menyimpan data subkategori
        console.log("Subkategori Data:", subkategoriResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error); // Log kesalahan
        setError(error); // Simpan error ke dalam state
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    };

    fetchKategoriData(); // Memanggil fungsi asynchronous untuk mengambil data ketika komponen di-mount
  }, []); // Array dependency kosong untuk menjalankan efek hanya sekali saat komponen di-mount

  return { kategoriData, subkategoriData, loading, error }; // Mengembalikan kategori, status loading, dan error
};

export default useKategori;
