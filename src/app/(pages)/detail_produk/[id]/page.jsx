"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Import the carousel
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/axios";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"; // Import phone number formatter
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { formatHarga } from "@/utils/priceFormatter";


const ContactSeller = ({ params }) => {
  const { id } = params; // Ambil id dari dynamic route
  const { userDataX } = useAuth(); // Ambil user data dari custom hook useAuth

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = localStorage.getItem("token");

  const [detailProduk, setDetailProduk] = useState(null);

  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; 
  
        const response = await api.get(`/api/produk/${id}`, { headers });
        setDetailProduk(response.data || {}); 
        console.log(response);
      } catch (error) {
        console.error("Error fetching transaksi pembelian:", error);
      }
    };
  
    if (id) { 
      fetchTransaksiBeli();
    }
  }, [id]); 
  

  const handlePesanClick = async () => {
    try {
      if (!detailProduk || !userDataX) {
        console.error("Data tidak lengkap:", { detailProduk, userDataX });
        return;
      }

      const idProduk = detailProduk.id_produk;
      const idUser = userDataX.id_user;
      const idAlamat = detailProduk.alamat.id_alamat;

      const response = await api.get(`/api/transaksi/create`, {
        params: {
          id_produk: idProduk,
          id_alamat: idAlamat,
          id_user_pembeli: idUser,
        },
      });

      if (response.status === 201) {
        const nomorTelepon = detailProduk.user.no_telepon;
        const formattedPhoneNumber = formatPhoneNumber(nomorTelepon);
        const waLink = `https://wa.me/${formattedPhoneNumber}`;
        window.location.href = waLink;
      } else {
        console.error("Gagal membuat transaksi:", response.data);
      }
    } catch (error) {
      console.error("Error membuat transaksi:", error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, 
    autoplaySpeed: 5000,
  };

  return (
    <div className="min-h-screen">
      {detailProduk ? (
        <div className="sm:w-[95%] md:w-[90%] mx-auto my-10 bg-lightbg flex sm:flex-col md:flex-row rounded-2xl overflow-hidden">
          <div className="h-full rounded-2xl overflow-hidden sm:w-full md:w-1/2">
            <Slider {...carouselSettings}>
              {detailProduk.list_url_gambar.map((url, index) => (
                <div key={index} className="h-full  overflow-hidden">
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="h-full sm:w-full md:w-1/2 p-5 flex justify-center flex-col">
            <p className="font-bold text-2xl">{detailProduk.nama_produk}</p>
            <p className="text-2xl text-[#0087E0] mt-2">
              {formatHarga(detailProduk.harga)}
            </p>
            <div className="mt-10">
              <p className="font-bold">Deskripsi produk</p>
              <p>{detailProduk.url_teks_deskripsi}</p>
              <p className="font-bold mt-10">Alamat</p>
              <p>{detailProduk.alamat.nama_lokasi}, {detailProduk.alamat.kecamatan}, {detailProduk.alamat.kota_kabupaten}, {detailProduk.alamat.provinsi}, {detailProduk.alamat.kode_pos} </p>
            </div>
            <div className="flex flex-col items-center mt-10 text-center h-fit w-16 ">
              <Link href={`/seller_view/${detailProduk.user.id_user}`}>
                <img
                  src={`${apiBaseUrl}/${detailProduk.user.url_foto_profil}`}
                  alt="Seller"
                  className="rounded-full"
                />
                <p className="font-semibold">{detailProduk.user.nama_akun}</p>
              </Link>
              <div className="h-fit flex items-center gap-2">
                <img src="/icons/sm/star.svg" alt="" />
                <p className="font-bold ">{parseFloat(detailProduk.average_user_rating).toFixed(1)}</p>
              </div>
            </div>
            <button
              onClick={handlePesanClick}
              className="bg-[#0D96C4] py-2 px-8 text-white rounded-lg mt-36 m-auto"
            >
              Pesan
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Loading...</p>
      )}
    </div>
  );
};

export default ContactSeller;
