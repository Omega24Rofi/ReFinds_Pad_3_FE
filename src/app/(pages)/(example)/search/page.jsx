"use client";
import { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState(""); // To store the form input
  const [produkData, setProdukData] = useState([]);   // To store the returned products

  // Function to handle the form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    
    // Split the input string into an array by spaces
    const searchKeywords = searchInput.trim().split(" ");

    console.log("KEYWORD", searchKeywords);
    
    // Call the search function
    await searchProduk(searchKeywords);
  };

  // Function to perform the search and fetch data from the backend
  const searchProduk = async (keywords) => {
    try {
      const response = await axios.post("http://localhost:8000/api/produk/search_produk", {
        keywords: keywords, // Send the keywords array to the backend
        kategori: [],
        subkategori: [],
        
      });
      
      // Set the returned data to state
      setProdukData(response.data);
      console.log("HASIL SEARCH", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <h1>Search Products</h1>
      
      {/* Form for entering search input */}
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
      
      {/* Displaying search results */}
      <ul>
        {/* No display,  */}
      </ul>
    </div>
  );
};

export default SearchPage;
