"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/axios";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"; // Import phone number formatter
import { formatHarga } from "@/utils/priceFormatter";


const ContactSeller = ({ params }) => {
  const { id } = params; // Ambil id dari dynamic route
  const { userDataX } = useAuth(); // Ambil user data dari custom hook useAuth

  // Cek apakah userDataX ada dan konsol log untuk debugging
  useEffect(() => {
    console.log("userDataX:", userDataX); // Debugging: Cek nilai userDataX
  }, [userDataX]);

  // URL domain api
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = localStorage.getItem("token");

  // transaksi beli
  const [detailProduk, setDetailProduk] = useState(null); // Ubah default menjadi null

  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const response = await api.get(`/api/produk/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("DETAIL PRODUK", response.data); // Log detail produk yang diterima
        setDetailProduk(response.data); // Perbaiki nama fungsi setter
      } catch (error) {
        console.error("Error fetching transaksi pembelian:", error);
      }
    };

    if (token && id) {
      fetchTransaksiBeli();
    }
  }, [token, id]);

  // Cek apakah detailProduk ada dan konsol log untuk debugging
  useEffect(() => {
    console.log("detailProduk:", detailProduk); // Debugging: Cek nilai detailProduk
  }, [detailProduk]);

  const handlePesanClick = async () => {
    try {
      if (!detailProduk || !userDataX) {
        console.error("Data tidak lengkap:", { detailProduk, userDataX });
        return; // Jika detailProduk atau userDataX tidak ada, batalkan
      }

      console.log("ID Produk:", detailProduk.id_produk);
      console.log("ID User:", userDataX.id_user);
      console.log("ID Alamat:", detailProduk.alamat.id_alamat);

      // Mendapatkan ID produk, alamat, dan ID user dari data
      const idProduk = detailProduk.id_produk;
      const idUser = userDataX.id_user;
      const idAlamat = detailProduk.alamat.id_alamat;

      // Membuat transaksi dengan mengakses API
      const response = await api.get(`/api/transaksi/create`, {
        params: {
          id_produk: idProduk,
          id_alamat: idAlamat,
          id_user_pembeli: idUser, // ID user pembeli
        },
      });

      console.log("Transaksi response:", response); // Debugging: Log response transaksi

      if (response.status === 201) {
        // Jika transaksi berhasil, redirect ke WhatsApp
        const nomorTelepon = detailProduk.user.no_telepon;
        // const nomorTelepon = "6281904703153";
        const formattedPhoneNumber = formatPhoneNumber(nomorTelepon); // Gunakan fungsi formatPhoneNumber
        const waLink = `https://wa.me/${formattedPhoneNumber}`;
        window.location.href = waLink; // Redirect ke WhatsApp
      } else {
        console.error("Gagal membuat transaksi:", response.data);
      }
    } catch (error) {
      console.error("Error membuat transaksi:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {detailProduk ? ( // Render hanya jika detailProduk ada
        <div className="w-[90%] mx-auto mt-10 bg-lightbg flex flex-row">
          <div className="h-full">
            <img
              src={detailProduk.list_url_gambar[0]} // Optional chaining untuk menghindari error
              alt="Product"
              className="h-full w-full"
            />
          </div>
          <div className="h-full w-[50%] p-5 flex justify-center flex-col">
            <p className="font-bold text-2xl">{detailProduk.nama_produk}</p>
            <p className="text-2xl text-[#0087E0] mt-2">
              {formatHarga(detailProduk.harga)}
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
                />
                <p>{detailProduk.user.nama_akun}</p>
              </Link>
            </div>
            <button
              onClick={handlePesanClick}
              className="bg-[#0D96C4] p-2 text-white rounded-lg mt-36 w-48 m-auto"
            >
              Pesan dan Hubungi Penjual
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Loading...</p> // Tampilkan loading jika data belum ada
      )}
    </div>
  );
};

export default ContactSeller;


