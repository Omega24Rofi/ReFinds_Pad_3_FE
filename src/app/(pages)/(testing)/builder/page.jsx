"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import api from "@/utils/axios";
import { useSearchParams } from "next/navigation";




const SearchPage = () => {
  const [searchInput, setSearchInput] = useState(""); // untuk menyimpan input form
  const [produkData, setProdukData] = useState([]); // untuk menyimpan data produk dari BE
  const searchParams = useSearchParams(); // Hook for accessing query parameters

  // Ambil keyword dari query parameter URL
  const keywords = searchParams.get("keywords");

  useEffect(() => {
    if (keywords) {
      // Update state dengan keyword yang diterima dari URL dan lakukan pencarian
      setSearchInput(keywords);
      searchProduk(keywords.trim().split(" ")); // Panggil searchProduk dengan keyword
    }
  }, [keywords]);

  // Function untuk menangani input keyword search
  const handleSearch = async (event) => {
    event.preventDefault();

    // Split input berdasarkan spasi
    const searchKeywords = searchInput.trim().split(" ");
    console.log("KEYWORD", searchKeywords);

    // Memanggil fungsi search dengan parameter array keyword yang sudah diolah
    await searchProduk(searchKeywords);
  };

  // Function untuk melakukan pencarian
  const searchProduk = async (keywords) => {
    try {
      const response = await api.post("/api/produk/search_produk", {
        keywords: keywords, // mengirim array keyword ke BE
        kategori: [],
        subkategori: [],
      });

      // Set produkData dari BE ke const
      setProdukData(response.data);
      console.log("HASIL SEARCH", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="min-h-screen">

      {/* Displaying search results */}
      <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
        {produkData.length === 0 ? (
          <div className="flex justify-center items-center w-full text-center text-xl font-bold">
            Produk yang Anda cari tidak ditemukan
          </div>
        ) : (
          produkData.map((produk) => (
            <Link href={"/contact_seller"} key={produk.id_produk} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
              <img src={produk.list_url_gambar[0]} alt="" className="h-36 w-full" />
              <p className="px-2">{produk.nama_produk}</p>
              <p className="text-blue-300 px-2">Rp. {produk.harga}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
