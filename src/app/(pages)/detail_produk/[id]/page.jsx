"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Import the carousel
import Link from "next/link";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/axios";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"; // Import phone number formatter
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles

const ContactSeller = ({ params }) => {
  const { id } = params; // Ambil id dari dynamic route
  const { userDataX } = useAuth(); // Ambil user data dari custom hook useAuth

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = localStorage.getItem("token");

  const [detailProduk, setDetailProduk] = useState(null);

  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const response = await api.get(`/api/produk/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetailProduk(response.data);
      } catch (error) {
        console.error("Error fetching transaksi pembelian:", error);
      }
    };

    if (token && id) {
      fetchTransaksiBeli();
    }
  }, [token, id]);

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
  };

  return (
    <div className="min-h-screen">
      {detailProduk ? (
        <div className="w-[90%] mx-auto mt-10 bg-lightbg flex flex-row rounded-2xl overflow-hidden">
          <div className="h-full rounded-2xl overflow-hidden w-1/2">
            <Slider {...carouselSettings}>
              {detailProduk.list_url_gambar.map((url, index) => (
                <div key={index} className="h-full">
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="h-full w-[50%] p-5 flex justify-center flex-col">
            <p className="font-bold text-2xl">{detailProduk.nama_produk}</p>
            <p className="text-2xl text-[#0087E0] mt-2">
              Rp. {detailProduk.harga}
            </p>
            <div className="mt-10">
              <p className="font-bold">Deskripsi produk</p>
              <p>{detailProduk.url_teks_deskripsi}</p>
            </div>
            <div className="flex flex-row align-middle mt-10 text-center h-fit w-12">
              <Link href="/seller_view">
                <img
                  src={`${apiBaseUrl}/${detailProduk.user.url_foto_profil}`}
                  alt="Seller"
                  className="rounded-full"
                />
                <p className="font-semibold">{detailProduk.user.nama_akun}</p>
              </Link>
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
