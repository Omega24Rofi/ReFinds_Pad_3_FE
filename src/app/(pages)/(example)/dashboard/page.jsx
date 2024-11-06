"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";

const ProdukList = () => {
  const { kategoriData } = useKategori();
  console.log("KATEGORI_DATA:", kategoriData);

  
  ///////////////////// USE EFFECT UNTUK FETCHING USER DATA
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
  }, []); // useEffect ini hanya akan dijalankan sekali saat komponen pertama kali di-mount.


  ///////////////////// USE EFFECT UNTUK FETCHING PRODUK DAN GAMBAR PRODUK, akan dijalankan setiap selectedKategori berubah nilainya
  const [produks, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    // Fetch produk dari API
    const fetchAllProduks = async () => {
      try {
        const response = await api.get("/api/produk");
        setProduks(response.data); // Simpan data produk ke state
        console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading menjadi false setelah data selesai diambil
      }
    };

    fetchAllProduks(); // Panggil fungsi untuk mengambil data produk
  }, []); // Kosong berarti hanya dijalankan sekali setelah komponen dimount

  const [selectedKategori, setSelectedKategori] = useState("");
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const response = await api.get(
          `/api/produk/kategori/${selectedKategori}`
        );
        setProduks(response.data); // Simpan data produk ke state

        console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error); // Tangani error
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchProduks(); // Panggil fungsi untuk mengambil data produk
  }, [selectedKategori]);

  ///////////////////// HANDLECHANGE HANDLECHANGE HANDLECHANGE
  // destructuring array WTF

  const handleChange = (event) => {
    setSelectedKategori(event.target.value);
    // Anda dapat menambahkan logika tambahan di sini, misalnya, memfilter produk berdasarkan kategori yang dipilih.
    console.log("Kategori yang dipilih:", event.target.value);
  };

  /**
   * jadi gini
   * yang perlu diubah itu selectedKategori menggunakan fungsi setSelectedKategori()
   *    untuk menampilkan barang berdasarkan kategori
   * jika selectedKategori kosong maka kan menampilkan semua produk
   * 
   * contoh dibawah itu menggunakan <select> dan fungsi onChange untuk trigger handleChange
   * klo mau pake <button> tingal menggunakan onClick = {handleChange}
   */

  ///////////////////////////////////// RENDER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Menampilkan loading atau data produk
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
