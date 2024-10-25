"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import axios from "axios";
import withLevel from "@/app/component/withLevel";
import withAuth from "@/app/component/withAuth";
import useAuth from "@/app/component/useAuth";

const ACCProduk = () => {
  // const { userData, loading } = useAuth(); // Mengambil loading dari useAuth
  const [produkData, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loadingProduk, setLoadingProduk] = useState(true); // State untuk loading produk

  useEffect(() => {
    const fetchUnACCProduks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/produk/unacc"
        );
        setProduks(response.data); // Simpan data produk ke state
        // console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProduk(false); // Set loading menjadi false setelah data produk selesai diambil
      }
    };

    fetchUnACCProduks(); // Panggil fungsi untuk mengambil data produk
  }, []); // Kosong berarti hanya dijalankan sekali setelah komponen dimount

  const updateStatus = async (id_produk, status_post) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/produk/update-status/${id_produk}`,
        {
          status_post,
        }
      );
      console.log("Update success:", response.data);
      // Optionally refresh the product data or update UI
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fungsi REJECT produk
  const rejectProduct = (id_produk) => {
    updateStatus(id_produk, "rejected");
  };

  // Fungsi ACCEPT produk
  const acceptProduct = (id_produk) => {
    updateStatus(id_produk, "available");
  };

  // Tampilkan loading saat produk atau data user sedang diambil
  // if (loading || loadingProduk) {
  //   return <div>Loading...</div>;
  // }



  return (
    <div>
      <h1>Daftar produk perlu ACC</h1>

      {/* Menampilkan semua data produk yang perlu acc dan data pengguna */}
      <ul>
        {produkData.map((produk) => (
          <li key={produk.id_produk}>
            <h2>Username: {produk.user.nama_akun}</h2>
            <img src={produk.user.url_foto_profil} alt="Foto Profil" />
            <h2>Nama Produk: {produk.nama_produk}</h2>
            <p>Harga: {produk.harga}</p>
            <img src={produk.list_url_gambar[0]} alt="gambar_produk" />
            <br />

            {/* tombol accept */}
            <button
              onClick={() => acceptProduct(produk.id_produk)}
              id="btn_accept"
            >
              Accept
            </button>
          <span>&nbsp;&nbsp;</span>
            

            {/* Tombol reject */}
            <button
              onClick={() => rejectProduct(produk.id_produk)}
              id="btn_reject"
            >
              Reject
            </button>
            

            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(withLevel(ACCProduk, ["admin", "superadmin"], true));
