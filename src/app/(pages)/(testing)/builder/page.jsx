"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/axios";

const ITEMS_PER_PAGE = 30; // Number of items per page

const PaginatedPage = () => {
  const [produkData, setProdukData] = useState([]); // Product data from backend
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    // Fetch product data when the component mounts
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const response = await api.get("/api/produk"); // Update API endpoint as needed
      setProdukData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = produkData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
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
        {paginatedData.length === 0 ? (
          <div className="flex justify-center items-center w-full text-center text-xl font-bold">
            No products found.
          </div>
        ) : (
          paginatedData.map((produk) => (
            <Link href={`/detail_produk/${produk.id_produk}`} key={produk.id_produk} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
              <img src={produk.list_url_gambar[0]} alt="" className="h-36 w-full" />
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
            className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedPage;
