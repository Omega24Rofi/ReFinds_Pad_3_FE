"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";

export const Category = ({ params }) => {
  const title = "Category";
  const { id } = params; // Ambil id dari dynamic route
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter(); // Inisialisasi router
  const { kategoriData, subkategoriData } = useKategori();

  // user produk
  const [kategorisProduks, setKategorisProduks] = useState([]); // Array default kosong
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await api.get(`/api/produk/kategori/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("PRODUK", response.data);
        // Periksa apakah data valid sebelum mengubah state
        if (response.data) {
          setKategorisProduks(response.data); // Ambil hanya array produk
        } else {
          console.error("Invalid response structure:", response.data);
          setKategorisProduks([]); // Tetap atur state meskipun data tidak valid
        }
      } catch (error) {
        console.error("Error fetching produk:", error);
      } finally {
        setIsLoading(false); // Selesai memuat data
      }
    };

    if (token) fetchProduk();
  }, [token, id]); // Tambahkan dependensi `id` untuk merespon perubahan URL kategori

  return (
    <div className="min-h-screen h-screen">
      <div className="h-[30%] w-full bg-[#68C7E7] mt-16 -z-[99] relative text-center flex flex-col align-middle justify-center">
        <img
          src="/images/categories/categoryof.png"
          alt=""
          className="w-60 mx-auto"
        />
        {!kategoriData.length ? (
          <p>Loading kategori...</p>
        ) : (
          <h1 className="font-bold text-2xl">
            {kategoriData.find((kat) => kat.id_kategori === parseInt(id))
              ?.nama_kategori || "Kategori tidak ditemukan"}
          </h1>
        )}
      </div>
      <div className="w-[80%] bg-lightbg flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
        {/* <p className="text-xl font-bold text-black px-2"></p> */}
        {isLoading ? (
          <p>Loading...</p> // Tampilkan loading saat data masih diambil
        ) : (
          <div className="flex flex-wrap">
            {kategorisProduks.length > 0 ? (
              kategorisProduks.map((kategorisProduk) => (
                <Link
                  href={`/detail_produk/${kategorisProduk.id_produk}`} // URL dinamis dengan id_produk
                  key={kategorisProduk.id_produk}
                  className="card min-h-fit bg-white box-content w-[11.4rem] m-2 rounded-lg"
                >
                  <img
                    src={
                      kategorisProduk.list_url_gambar[0] || "/placeholder.jpg"
                    } // Gambar default jika tidak ada
                    alt={kategorisProduk.nama_produk || "Product Image"}
                    className="h-36 w-full"
                  />
                  <p className="px-2">{kategorisProduk.nama_produk}</p>
                  <p className="text-blue-300 px-2">
                    Rp. {kategorisProduk.harga}
                  </p>
                </Link>
              ))
            ) : (
              <p>No products found in this category.</p> // Pesan jika data kosong
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
