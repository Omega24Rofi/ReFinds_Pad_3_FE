"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";

const ProdukList = () => {
  const { kategoriData } = useKategori();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("KATEGORI_DATA:", kategoriData);



  const handleAccProduk = async (id_produk, isAccepted) => {
    try {
      // Kirim request ke API dengan parameter true (Terima) atau false (Tolak)
      const response = await api.get(
        `/api/produk/acc/${id_produk}/${isAccepted}`
      );

      // Jika berhasil, reload halaman
      if (response.status === 200) {
        alert(`Produk ${isAccepted ? "diterima" : "ditolak"}!`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Gagal mengubah status produk:", error);
      alert("Terjadi kesalahan saat memproses permintaan.");
    }
  };

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
        let url = "/api/produk/status/unacc";
        if (selectedKategori) {
            url = `/api/produk/status/unacc/kategori/${selectedKategori}`;
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
      <h1 className="text-center mt-5 text-2xl font-bold">
        Persetujuan Posting Produk
      </h1>

      {/* Menampilkan dropdown kategori */}
      <div className="w-[90%] mx-auto mt-5">
        <label htmlFor="kategori" className="block mb-2">
          Pilih Kategori:
        </label>
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
            <li key={produk.id_produk} className="flex flex-row mb-5 ">
              <div className="flex flex-col items-center justify-center mr-2 my-auto w-[8%]">
                <img
                  src={`${apiBaseUrl}/${produk.user.url_foto_profil}`}
                  alt="Foto Profil"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  className="mb-2"
                />
                <h2>{produk.user.nama_akun}</h2>
              </div>

              <div className="flex flex-row bg-white justify-center align-middle rounded-xl w-full overflow-hidden">
                <img
                  src={produk.list_url_gambar[0]}
                  alt="gambar_produk"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="product-info ml-2 p-4 pr-5 w-[70%]">
                  <p>Nama Produk: {produk.nama_produk}</p>
                  <p>Harga: Rp {produk.harga}</p>
                  <p>Deskripsi produk: {produk.url_teks_deskripsi}</p>
                </div>

                {/* Tombol untuk menerima atau menolak produk */}
                <div className="flex mr-2 items-center justify-center gap-2 my-auto">
                  <button>
                    <img src="/icons/info.svg" alt="info" />
                  </button>
                  <button
                    className="button bg-blue_btn text-white text-lg font-bold w-28 py-2 rounded-xl"
                    onClick={() => handleAccProduk(produk.id_produk, true)}
                  >
                    Terima
                  </button>
                  <button
                    className="button bg-red-500 text-white text-lg font-bold w-28 py-2 rounded-xl"
                    onClick={() => handleAccProduk(produk.id_produk, false)}
                  >
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
