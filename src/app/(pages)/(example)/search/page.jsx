"use client";
import { useState } from "react";
import api from "@/utils/axios";

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
    <div>
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
      
      {/* Display search results */}
      <ul>
        {/* iterasi $produkData dilakukan disini */}
      </ul>
    </div>
  );
};

export default SearchPage;
