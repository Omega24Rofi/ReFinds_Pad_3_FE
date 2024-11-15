"use client"; // Menandakan bahwa ini adalah client component

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import api from "@/utils/axios";
import withLevel from "@/components/withLevel";
import withAuth from "@/components/withAuth";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DetailPopUp from "@/components/detailPopUp";

// import '../../global.css';


const ACCProduk = () => {
  // const { userData, loading } = useAuth(); // Mengambil loading dari useAuth
  const [produkData, setProduks] = useState([]); // State untuk menyimpan data produk
  const [loadingProduk, setLoadingProduk] = useState(true); // State untuk loading produk

  useEffect(() => {
    const fetchUnACCProduks = async () => {
      try {
        const response = await api.get(
          "/api/produk/unacc"
        );
        setProduks(response.data); // Simpan data produk ke state
        // console.log("ResponseData: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProduk(false); // Set loading menjadi false setelah data produk selesai diambil
      }
    };

    fetchUnACCProduks(); // Panggil fungsi untuk mengambil data produk
  }, []); // Kosong berarti hanya dijalankan sekali setelah komponen dimount

  const updateStatus = async (id_produk, status_post) => {
    try {
      const response = await api.post(
        `/api/produk/update-status/${id_produk}`,
        {
          status_post,
        }
      );
      console.log("Update success:", response.data);
      // Optionally refresh the product data or update UI
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fungsi REJECT produk
  const rejectProduct = (id_produk) => {
    updateStatus(id_produk, "rejected");
  };

  // Fungsi ACCEPT produk
  const acceptProduct = (id_produk) => {
    updateStatus(id_produk, "available");
  };

  // Tampilkan loading saat produk atau data user sedang diambil
  // if (loading || loadingProduk) {
  //   return <div>Loading...</div>;
  // }

                                   
  return (
    <div className="min-h-screen">
      <h1 className="text-center mt-5 text-2xl font-bold">Persetujuan Posting Produk</h1>

{/* Menampilkan semua data produk yang perlu acc dan data pengguna */}
      <div className="w-[90%] bg-lightbg mx-auto mt-5 rounded-3xl p-4">
        <p className="mt-2 text-2xl font-bold">Produk Masuk</p>
        <ul>
        {/* Dummy data untuk visualisasi */}
          <li className="flex flex-row">
            <div className="mr-2 my-auto">
              <img
                src="/images/testimage/account_circle.png"
                alt="Foto Profil"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                className="mx-auto"
                />
                <h2>contoh_user</h2>
            </div>
            <div className="flex flex-row bg-white justify-center align-middle rounded-xl"> 
              <img
                src="https://via.placeholder.com/150"
                alt="gambar_produk"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="product-info ml-2 p-4 pr-5 w-[70%]">
                <p>Nama Produk: Produk Contoh</p>
                <p>Harga: Rp 100,000</p>
                <p>Deskripsi produk : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque in repellendus unde quibusdam doloremque neque delectus animi, eligendi</p>
              </div>

              {/* tombol accept */}
              <div className="flex mr-2 items-center justify-center gap-2 my-auto">
              
              <DetailPopUp
                    trigger={
                      <button>
                        <img src="/icons/info.svg" alt="info"/>
                      </button>
                    }
                    productName="Produk Contoh"
                    price="Rp 100,000"
                    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque in repellendus unde quibusdam doloremque neque delectus animi, eligendi"
                    imageUrl="/images/testimage/image2.png"
                  />

<button id="btn_accept" className="button bg-blue_btn text-white text-lg font-bold w-28 py-2  rounded-xl">
                Terima
              </button>

              {/* tombol reject */}
              <button id="btn_reject" className="button bg-blue_btn text-white text-lg font-bold w-28 py-2 rounded-xl">Tolak</button>
             
                </div>
              

              </div>
    
            

            <br />
            <br />
          </li>
        </ul>
      </div>

    </div>
  );
};

export default withAuth(withLevel(ACCProduk, ["admin", "superadmin"], true));
