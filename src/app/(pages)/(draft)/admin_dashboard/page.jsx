"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";

const ProdukList = () => {
  const { kategoriData } = useKategori();
  console.log("KATEGORI_DATA:", kategoriData);

  ///////////////////// USE EFFECT UNTUK FETCHING USER DATA
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk loading
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
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Meskipun ada error, tetap hentikan state loading
      });
  }, []); // useEffect ini hanya akan dijalankan sekali saat komponen pertama kali di-mount.

  ///////////////////// USE EFFECT UNTUK FETCHING PRODUK
  const [produks, setProduks] = useState([]); // State untuk menyimpan data produk
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
    console.log("Kategori yang dipilih:", event.target.value);
  };

  // Menampilkan loading atau data produk
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center mt-5 text-2xl font-bold">Persetujuan Posting Produk</h1>

      {/* Menampilkan dropdown kategori */}
      <div className="w-[90%] mx-auto mt-5">
        <label htmlFor="kategori" className="block mb-2">Pilih Kategori:</label>
        <select
          id="kategori"
          name="kategori"
          onChange={handleChange}
          className="w-full p-2 rounded-xl border"
        >
          <option value="">Pilih Kategori</option>
          {kategoriData.map((kategori) => (
            <option key={kategori.id_kategori} value={kategori.id_kategori}>
              {kategori.nama_kategori}
            </option>
          ))}
        </select>
      </div>

      {/* Menampilkan semua data produk yang perlu acc dan data pengguna */}
      <div className="w-[90%] bg-lightbg mx-auto mt-5 rounded-3xl p-4">
        <p className="mt-2 text-2xl font-bold">Produk Masuk</p>
        <ul>
          {/* Menampilkan produk yang telah difilter berdasarkan kategori */}
          {produks.map((produk) => (
            <li key={produk.id_produk} className="flex flex-row mb-5">
              <div className="mr-2 my-auto">
                <img
                  src="/images/testimage/account_circle.png"
                  alt="Foto Profil"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  className="mx-auto"
                />
                <h2>contoh_user</h2>
              </div>
              <div className="flex flex-row bg-white justify-center align-middle rounded-xl">
                <img
                  src={produk.list_url_gambar[0]}
                  alt="gambar_produk"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <div className="product-info ml-2 p-4 pr-5 w-[70%]">
                  <p>Nama Produk: {produk.nama_produk}</p>
                  <p>Harga: Rp {produk.harga}</p>
                  <p>Deskripsi produk: {produk.deskripsi}</p>
                </div>

                {/* Tombol untuk menerima atau menolak produk */}
                <div className="flex mr-2 items-center justify-center gap-2 my-auto">
                  <button>
                    <img src="/icons/info.svg" alt="info" />
                  </button>
                  <button className="button bg-blue_btn text-white text-lg font-bold w-28 py-2 rounded-xl">
                    Terima
                  </button>
                  <button className="button bg-blue_btn text-white text-lg font-bold w-28 py-2 rounded-xl">
                    Tolak
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProdukList;
