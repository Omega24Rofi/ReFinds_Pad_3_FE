"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

import useKategori from "@/hooks/useKategori";
import { formatTanggal } from "@/utils/dateFormatter";
import { formatHarga } from "@/utils/priceFormatter";

export const Category = ({ params }) => {
  const title = "Category";
  const { id } = params; // Ambil id dari dynamic route
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter(); // Inisialisasi router
  const { kategoriData, subkategoriData } = useKategori();
  const options = { day: "2-digit", month: "long", year: "numeric" };

  // user produk
  const [kategorisProduks, setKategorisProduks] = useState([]); // Array default kosong
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {}; // Optional header
  
        const response = await api.get(`/api/produk/kategori/${id}`, {
          headers,
        });
  
        console.log("PRODUK", response.data);
  
        if (response.data) {
          setKategorisProduks(response.data);
        } else {
          console.error("Invalid response structure:", response.data);
          setKategorisProduks([]);
        }
      } catch (error) {
        console.error("Error fetching produk:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProduk();
  }, [token, id]);
   // Tambahkan dependensi `id` untuk merespon perubahan URL kategori

  return (
    <div className="min-h-screen mb-12 ">
      <div className="h-[14rem] w-full bg-[#68C7E7] mt-16 -z-[99] relative text-center flex flex-col align-middle justify-center">
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
      <div className="sm:w-[90%] md:w-[80%] bg-lightbg flex-wrap -mt-12 m-auto py-6 rounded-2xl px-2 justify-evenly">
        {/* <p className="text-xl font-bold text-black px-2"></p> */}
        {isLoading ? (
          <p>Loading...</p> // Tampilkan loading saat data masih diambil
        ) : (
          <div className="flex flex-wrap sm:justify-evenly justify-start">
            {kategorisProduks.length > 0 ? (
              kategorisProduks.map((kategorisProduk) => (
                <Link
                  href={`/detail_produk/${kategorisProduk.id_produk}`} // URL dinamis dengan id_produk
                  key={kategorisProduk.id_produk}
                  className="hover:scale-90 card h-72 bg-white box-content sm:w-[13rem] w-[8.55rem] m-2 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="h-44 w-full overflow-hidden flex align-center justify-center">
                    <img
                      src={
                        kategorisProduk.list_url_gambar[0] || "/placeholder.jpg"
                      } // Gambar default jika tidak ada
                      alt={kategorisProduk.nama_produk || "Product Image"}
                      className="h-fit"
                    />
                  </div>
                  <p className="pb-12 px-2 h-8 mt-2 text-[18px] ">
                    {kategorisProduk.nama_produk}
                  </p>
                  <p className="text-blue_btn px-2 font-bold pb-2">
                    {formatHarga(kategorisProduk.harga)}
                  </p>
                  <p className="text-right px-2">
                    {formatTanggal(kategorisProduk.tanggal_post)}
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
