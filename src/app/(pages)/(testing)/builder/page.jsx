"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 30; // Number of items per page

const PaginatedPage = () => {
  const [produkData, setProdukData] = useState([]); // Product data from backend
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [loading, setLoading] = useState(true); // State untuk loading
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get search parameters from the URL
  const keywordsString = searchParams.get("keywords");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // Convert keywords string to array
  const keywordsArray = keywordsString ? keywordsString.trim().split(" ") : [];

  useEffect(() => {
    // Log loading status when useEffect is triggered
    console.log("Loading status on page load:", loading);
    // Fetch product data when the component mounts
    searchProduk(keywordsArray, minPrice, maxPrice);
  }, [keywordsString, minPrice, maxPrice]); // Re-run if URL params change

  // Function untuk melakukan pencarian
  const searchProduk = async (keywords, minPrice, maxPrice) => {
    console.log("Loading status before search starts:", loading); // Log loading before search starts
    setLoading(true); // Set loading to true when search starts
    console.log("Loading status after setLoading(true):", loading); // Log loading after setting true
    console.log("Keywords (array):", keywords); // Log keywords as array
    console.log("Min Price:", minPrice); // Log minPrice
    console.log("Max Price:", maxPrice); // Log maxPrice

    try {
      const response = await api.post("/api/produk/search_filter", {
        keywords, // Mengirim array keyword ke backend
        sort_by: "terbaru",
        min_price: minPrice || null, // Kirim null jika tidak diisi
        max_price: maxPrice || null, // Kirim null jika tidak diisi
      });

      // Transform data to ensure it is an array
      const products = response.data?.data || []; // Adjust based on actual response structure
      setProdukData(products);
      console.log("HASIL SEARCH", products);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setProdukData([]); // Set empty array on error
    } finally {
      setLoading(false); // Set loading to false once the search is finished
      console.log("Loading status after search completes:", loading); // Log loading after search completes
    }
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = produkData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(produkData.length / ITEMS_PER_PAGE);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen">
      {/* Displaying paginated results */}
      <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
        {paginatedData.length === 0 && loading ? (
          <div className="flex justify-center items-center w-full text-center text-xl font-bold">
            Loading...
          </div>
        ) : paginatedData.length === 0 && !loading ? (
          <div className="flex justify-center items-center w-full text-center text-xl font-bold">
            xxx
          </div>
        ) : (
          paginatedData.map((produk) => (
            <Link
              href={`/detail_produk/${produk.id_produk}`}
              key={produk.id_produk}
              className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg"
            >
              <img
                src={produk.list_url_gambar[0]}
                alt=""
                className="h-36 w-full"
              />
              <p className="px-2">{produk.nama_produk}</p>
              <p className="text-blue-300 px-2">Rp. {produk.harga}</p>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-2 bg-lightbg text-black rounded-full disabled:opacity-50"
          >
            <img src="icons/sm/arrow-left.svg" alt="" />
          </button>
          <span className="px-4 py-2">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-2 bg-lightbg text-black rounded-full disabled:opacity-50"
          >
            <img src="icons/sm/arrow-right.svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedPage;
