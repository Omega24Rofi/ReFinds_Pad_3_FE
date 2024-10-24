
"use client"; // Menandakan bahwa ini adalah client component


import { useEffect, useState } from "react";
import axios from "axios";




const ProdukList = () => {
  // State untuk menyimpan nilai input form
  const [userData, setUserData] = useState(null);

  // useEffect untuk mengambil userData
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/user_data", {
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

  
  const [produks, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/produk'); // Ganti URL dengan endpoint API kamu
        setProduks(response.data); // Simpan data produk ke state

        console.log("ResponseData: ", response.data);


      } catch (error) {
        console.error("Error fetching products:", error); // Tangani error
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchProduks(); // Panggil fungsi untuk mengambil data produk
  }, []);

  // Menampilkan loading atau data produk
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h1>Daftar Produk</h1>
      <ul>
        {produks.map((produk) => (
          <li key={produk.id_produk}>
            <h2>{produk.nama_produk}</h2>
            <p>Harga: {produk.harga}</p>
            <p>Status: {produk.status_post}</p>
          </li>
        ))}
      </ul>
    </div>
  );



};


export default ProdukList;
  