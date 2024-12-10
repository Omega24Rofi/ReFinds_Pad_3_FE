"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import api from "@/utils/axios";
import useKategori from "@/hooks/useKategori";
// import { useRouter } from "next/navigation";
import { formatTanggal } from "@/utils/dateFormatter";
import { formatHarga } from "@/utils/priceFormatter";

const logout = () => {
  // clear the token
  localStorage.removeItem("token");
  // redirect to login page
  window.location.href = "/login";
};

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Tambahkan duplikasi slide pertama di akhir
  const extendedSlides = [...slides, slides[0]];

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === slides.length) {
        // Jika mencapai slide duplikat, lompat ke slide pertama tanpa transisi
        setIsTransitioning(false);
        setCurrentIndex(0);
      } else {
        setIsTransitioning(false);
      }
    };

    const slider = document.getElementById("slider");
    slider.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      slider.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative md:w-full h-[36vh] md:h-[100vh] mx-auto overflow-hidden">
      {/* Konten Carousel */}
      <div
        id="slider"
        className={`w-full h-full flex transition-transform duration-700 ease-in-out ${
          isTransitioning ? "" : "transition-none"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={slide}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tombol Navigasi */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ❯
      </button>
    </div>
  );
};

const Homepage = () => {
  const slides = [
    "/images/main_slider/sliderr3.png",
    "/images/main_slider/slider2.png",
    "/images/main_slider/slider1.png",
  ];

  ///////////////////// USE EFFECT UNTUK FETCHING PRODUK DAN GAMBAR PRODUK TERBARU
  const [produks, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        let url = "/api/produk";
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
  }, []);

  ///////////////////// USE EFFECT UNTUK FETCHING PRODUK DAN GAMBAR PRODUK TERPOPULER
  const [topProduks, setTopProduks] = useState([]); // State untuk menyimpan data produk
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        let url = "/api/top-products";
        const response = await api.get(url);
        setTopProduks(response.data); // Simpan data produk ke state
        console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // setLoading(false); // Selesai loading
      }
    };

    fetchProduks(); // Panggil fungsi untuk mengambil data produk
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Carousel */}
      <Carousel slides={slides} />
      <div className="w-full justify-center align-middle my-5">
        <div className="flex flex-row sm:gap-1 py-4 md:gap-8 h-fit align-middle justify-center sm:w-fit md:w-full overflow-scroll">
          <Link
            href={"/category/4"}
            className="sm:w-64 md:w-fit bg-white rounded-2xl shadow-lg pl-2 pr-4 flex sm:flex-row sm:scale-75 md:scale-100 md:flex-col items-center hover:scale-105 transition"
          >
            <img
              src="/images/categories/Two white plates with blue rim.png"
              alt="alat rumah tangga"
              className="my-auto"
              />
            <p className="px-2 text-center mt-4 ">Alat Rumah Tangga</p>
          </Link>

          <Link
            href={"/category/1"}
            className="sm:w-64 md:w-fit bg-white rounded-2xl shadow-lg p-2 flex sm:flex-row sm:scale-75 md:scale-100 md:flex-col items-center hover:scale-105 transition"
            >
            <img
              src="/images/categories/laptop white screen.png"
              alt="elektronik"
              className="my-auto"
              />
            <p className="px-2 text-center">Elektronik</p>
          </Link>

          <Link
            href={"/category/2"}
            className="sm:w-64 md:w-fit bg-white rounded-2xl shadow-lg p-2 flex sm:flex-row sm:scale-75 md:scale-100 md:flex-col items-center hover:scale-105 transition"
            >
            <img
              src="/images/categories/green sofa with two pillows.png"
              alt="perabotan"
              className="my-auto"
              />
            <p className="px-2 text-center">Furniture</p>
          </Link>

          <Link
            href={"/category/3"}
            className="sm:w-64 md:w-fit bg-white rounded-2xl shadow-lg p-2 flex sm:flex-row sm:scale-75 md:scale-100 md:flex-col items-center hover:scale-105 transition"
            >
            <img
              src="/images/categories/t-shirt mockup.png"
              alt="pakaian & outfit lainnya"
              className="my-auto"
            />
            <p className="px-2 text-center">Pakaian</p>
          </Link>
        </div>
      </div>

      {/* top produk */}
      <div className="sm:w-[75%] md:w-[80%] bg-lightbg flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
        <p className="text-xl font-bold text-black px-2">Top Product</p>
        <div className="flex flex-wrap sm:justify-evenly justify-center ">
          {topProduks.slice(0, 6).map((TopProduk) => (
            <Link
              href={`/detail_produk/${TopProduk.id_produk}`} // URL dinamis dengan id_produk
              key={TopProduk.id_produk}
              className="hover:scale-90 card h-72 bg-white box-content sm:w-[13rem] w-[8.55rem] m-2 rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-44 w-full overflow-hidden flex align-center justify-center">
                <img
                  src={TopProduk.list_url_gambar[0]}
                  alt=""
                  className="h-36 w-full"
                />
              </div>
              <p className="pb-12 px-2 h-8 mt-2 text-[18px] ">
                {TopProduk.nama_produk}
              </p>
              <p className="text-blue_btn px-2 font-bold pb-2">
                {formatHarga(TopProduk.harga)}
              </p>
              <p className="text-right px-2">
                {formatTanggal(TopProduk.tanggal_post)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* produk terbaru        */}
      <div className="sm:w-[75%] md:w-[80%] bg-lightbg flex-wrap my-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
        <p className="text-xl font-bold text-black px-2">Produk Terbaru</p>
        <div className="flex flex-wrap sm:justify-evenly md:justify-center">
          {produks.slice(0, 18).map((produk) => (
            <Link
              href={`/detail_produk/${produk.id_produk}`} // URL dinamis dengan id_produk
              key={produk.id_produk}
              className="hover:scale-90 card h-72 bg-white box-content sm:w-[13rem] w-[8.55rem] m-2 rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-44 w-full overflow-hidden flex align-center justify-center">
                <img
                  src={produk.list_url_gambar[0]}
                  alt={`Gambar ${produk.nama_produk}`}
                  className="h-36 w-full"
                />
              </div>
              <p className="pb-12 px-2 h-8 mt-2 text-[18px] ">
                {produk.nama_produk}
              </p>
              <p className="text-blue_btn px-2 font-bold pb-2">
                {formatHarga(produk.harga)}
              </p>
              <p className="text-right px-2">
                {formatTanggal(produk.tanggal_post)}
              </p>
            </Link>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Homepage;
