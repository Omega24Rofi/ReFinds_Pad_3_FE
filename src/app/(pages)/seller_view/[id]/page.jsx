"use client";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Import the carousel
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/axios";
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { formatHarga } from '@/utils/priceFormatter';
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { formatTanggal } from '@/utils/dateFormatter';

const SellerView = ({ params }) => {
    const { id } = params;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem("token");
    const [detailSeller, setDetailSeller] = useState(null);
    const { userDataX } = useAuth();
    const [availableProducts, setAvailableProducts] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellerView = async () => {
            try {
                const response = await api.get(`/api/user_public/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const detailSeller = response.data;
                setDetailSeller(detailSeller);
                console.log(detailSeller);
                console.log(detailSeller.url_foto_profil);
                console.log(apiBaseUrl);

                // Separate products based on status_post
                const available = detailSeller.produk.filter(product => product.status_post === 'available');
                const sold = detailSeller.produk.filter(product => product.status_post === 'sold');

                setAvailableProducts(available);
                setSoldProducts(sold);

                console.log("Available Products:", available);
                console.log("Sold Products:", sold);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data seller", error);
                setLoading(false);
            }
        };

        if (token && id) {
            fetchSellerView();
            setLoading(false)
        }
    }, [token, id]);

    const chatSeller = () => {
        if (!detailSeller || !detailSeller.nama_akun || !detailSeller.no_telepon) {
          console.error("Nomor telepon tidak tersedia.");
          return;
        }
      
        const nomorTelepon = detailSeller.no_telepon;
        const formattedPhoneNumber = formatPhoneNumber(nomorTelepon); // Ensure `formatPhoneNumber` is defined
        const waLink = `https://wa.me/${formattedPhoneNumber}`;
        window.location.href = waLink;
      };
      

    if (loading) {
        return <div>Loading...</div>; // Show loading state until the data is fetched
    }

    return (
        <div className="min-h-screen">
            <div className="w-[85%] bg-blue_sec mx-auto mt-5 p-5 rounded-3xl flex flex-row justify-between items-center">
                <div className="flex flex-row">
                    <div>
                        {detailSeller ? (
                            <>
                                <div className='flex flex-col justify-center items-center flex-wrap'>
                                    <img
                                        src={`${apiBaseUrl}/${detailSeller.url_foto_profil}`}
                                        alt={detailSeller.nama_akun}
                                        className="h-16 rounded-full"
                                    />
                                    <span className='w-full flex flex-row justify-center items-center gap-1 text-center mt-1'>
                                        <img src="/icons/sm/star.svg" alt="" />
                                        <p className='font-semibold'>{parseFloat(detailSeller.average_rating).toFixed(1)}</p>
                                    </span>
                                </div>
                            </>
                            
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="ml-2">
                        {detailSeller ? (
                            <>
                                <p>{detailSeller.nama_akun}</p>
                                <div className="flex flex-row">
                                    <img src="/icons/location.svg" alt="" />
                                    <p className="ml-2 mt-2">
                                        {detailSeller.alamat[0].nama_lokasi}, {detailSeller.alamat[0].kecamatan},{" "}
                                        {detailSeller.alamat[0].kota_kabupaten}, {detailSeller.alamat[0].provinsi},{" "}
                                        {detailSeller.alamat[0].kode_pos}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className="h-full flex items-center">
                    <button
                        className="flex flex-row bg-blue_btn rounded-xl px-4 py-2"
                        onClick={chatSeller}
                    >
                        <img src="/icons/chat.svg" alt="" className="h-5" />
                        <p className="text-white font-bold ml-2">Chat</p>
                    </button>
                </div>
            </div>
            <div className="w-[85%] mx-auto bg bg-lightbg p-4 my-5 rounded-3xl">
                <Tabs>
                    <TabList className={"flex justify-center mb-5"}>
                        <Tab>Produk</Tab>
                        <Tab>Terjual</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2 sm:justify-evenly md:justify-start">
                            {availableProducts.map((produk) => (
                                <Link
                                    href={`/detail_produk/${produk.id_produk}`}
                                    key={produk.id_produk}
                                    className="hover:scale-90 card sm:h-72 min-h-fit h-64 bg-white box-content sm:w-[13rem] md:w-[11.4rem] m-2 rounded-lg overflow-hidden shadow-md"
                                >
                                    <img
                                        src={produk.list_url_gambar[0] || "/images/testimage/image.png"}
                                        alt={produk.nama_produk}
                                        className="h-36 w-full"
                                    />
                                    <p className="pb-12 px-2 h-8 mt-2 text-[18px] ">{produk.nama_produk}</p>
                                    <p className="text-blue_btn px-2 font-bold pb-2">{formatHarga(produk.harga)}</p>
                                    <p className="text-right px-2">{formatTanggal(produk.tanggal_post)}</p>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {soldProducts.map((produk) => (
                            <div className="flex items-center bg-white rounded-lg shadow-md mt-2" key={produk.id_produk}>
                                <div className="rounded-lg w-64 overflow-hidden">
                                    <img
                                        src={produk.list_url_gambar[0] || "/images/testimage/image.png"}
                                        alt="Product Image"
                                        className='h-fit'
                                    />
                                </div>
                                <div className="ml-2">
                                    <p>
                                        <span className="font-semibold">Nama Produk</span>: {produk.nama_produk}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Harga Produk</span>: {formatHarga(produk.harga)}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Tanggal post</span>{" "}
                                        : {formatTanggal(produk.tanggal_post)}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Deskripsi</span>: {produk.url_teks_deskripsi}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default SellerView;
