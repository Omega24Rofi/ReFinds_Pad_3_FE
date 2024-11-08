"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";

const ProdukList = () => {
  const { kategoriData } = useKategori();
  console.log("KATEGORI_DATA:", kategoriData);

  const [userData, setUserData] = useState(null);
  // useEffect untuk mengambil userData
  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/api/user_data", {
        headers: {
          // token dikirim ke BE untuk mendapatkan user data terkait
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("ResponseData:", response.data); // Log data response
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Meskipun ada error, tetap hentikan state loading
      });
  }, []); 


  const [produks, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading
  const [selectedKategori, setSelectedKategori] = useState("");
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        let url = "/api/produk";
        if (selectedKategori) {
          url = `/api/produk/kategori/${selectedKategori}`;
        }
        const response = await api.get(url);
        setProduks(response.data); // Simpan data produk ke state
        console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Selesai loading
      }
    };
  
    fetchProduks(); // Panggil fungsi untuk mengambil data produk
  }, [selectedKategori]);
  

  const handleChange = (event) => {
    setSelectedKategori(event.target.value);
    // Anda dapat menambahkan logika tambahan di sini, misalnya, memfilter produk berdasarkan kategori yang dipilih.
    console.log("Kategori yang dipilih:", event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Daftar Produk</h1>

      {/* Dropdown untuk kategori */}
      <label htmlFor="kategori">Pilih Kategori:</label>
      <select id="kategori" name="kategori" onChange={handleChange}>
        {/* Opsi default */}
        <option value="" >Pilih Kategori</option>

        {/* Opsi SELECT KATEORI dari kategoriData */}
        {kategoriData.map((kategori) => (
          <option key={kategori.id_kategori} value={kategori.id_kategori}>
            {kategori.nama_kategori}
          </option>
        ))}
      </select>

      <br />
      <br />
      <br />
      <br />

      {/* Menampilkan daftar produk */}
      {/* tinggal styling */}
      <ul>
        {produks.map((produk) => (
          <li key={produk.id_produk}>
            <h2>Nama Produk: {produk.nama_produk}</h2>
            <p>Harga: {produk.harga}</p>
            <img src={produk.list_url_gambar[0]} alt="gambar_produk" />
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdukList;
