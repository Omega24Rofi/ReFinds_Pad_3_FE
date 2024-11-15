"use client";
import { useState } from "react";
<<<<<<< HEAD:src/app/(pages)/(example)/search/page.jsx
import axios from "axios";
import Link from "next/link";
=======
import api from "@/utils/axios";
>>>>>>> ba5b2c1d3a56d0909724e8b7644b425365996bea:src/app/(pages)/(draft)/search/page.jsx

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState(""); // untuk menyimpan input form
  const [produkData, setProdukData] = useState([]);   // untuk menyimpan data produk dari BE

  // Function untuk menangani input keyword search
  const handleSearch = async (event) => {
    event.preventDefault();
    
    // Split input berdasarkan spasi
    const searchKeywords = searchInput.trim().split(" ");

    console.log("KEYWORD", searchKeywords);
    
    // Memanggil funsgi search dengan parameter array keyword yang sudah diolah
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
      
      // Set produkData dari be ke const
      setProdukData(response.data);
      console.log("HASIL SEARCH", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <h1>Search Products</h1>
      
      {/* Form search input */}
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter keywords..."
        />
        <button type="submit">Search</button>
      </form>
      
<<<<<<< HEAD:src/app/(pages)/(example)/search/page.jsx
      {/* Displaying search results */}
        <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
            {Array.from({ length: 12 }).map((_, index) => (
                <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                    <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                    <p className='px-2'>With Hp INFINIX SMART 5</p>
                    <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                </Link>
            ))}
        </div>
=======
      {/* Display search results */}
      <ul>
        {/* iterasi $produkData dilakukan disini */}
      </ul>
>>>>>>> ba5b2c1d3a56d0909724e8b7644b425365996bea:src/app/(pages)/(draft)/search/page.jsx
    </div>
  );
};

export default SearchPage;
