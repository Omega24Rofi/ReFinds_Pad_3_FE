"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

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
    <div className="min-h-screen">
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
        <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
            {Array.from({ length: 12 }).map((_, index) => (
                <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                    <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                    <p className='px-2'>With Hp INFINIX SMART 5</p>
                    <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default SearchPage;
