"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/axios";

const SellerView = () => {
  const token = localStorage.getItem("token");

  // transaksi beli
  const [transaksiBeli, setTransaksiBeli] = useState([]);
  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const response = await api.get("/api/transaksi/pembelian", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("TRANSAKSI PEMBELIAN", response.data);
        setTransaksiBeli(response.data);
      } catch (error) {
        console.error("Error fetching transaksi pembelian:", error);
      }
    };

    if (token) fetchTransaksiBeli();
  }, [token]);

  // transaksi jual

  const [transaksiJual, setTransaksiJual] = useState([]);
  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const response = await api.get("/api/transaksi/penjualan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("TRANSAKSI PENJUALAN", response.data);
        setTransaksiJual(response.data);
      } catch (error) {
        console.error("Error fetching transaksi pembelian:", error);
      }
    };

    if (token) fetchTransaksiBeli();
  }, [token]);

  // user produk
  const [userProduks, setUserProduks] = useState([]);
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await api.get("/api/user/produk", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("USER'S PRODUK", response.data);
        setUserProduks(response.data.data); // Ambil hanya array produk
      } catch (error) {
        console.error("Error fetching produk:", error);
      }
    };

    if (token) fetchProduk();
  }, [token]);

  const cancelOrder = async (id) => {
    try {
      // Mengirimkan request ke API untuk membatalkan pesanan
      const response = await api.get(`/api/transaksi/${id}/batalkan-penjual`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Tanggapan sukses
      if (response.status === 200) {
        alert("Pesanan berhasil dibatalkan.");
        // Reload atau update data setelah pembatalan
        // Misalnya, reload halaman atau update state untuk menunjukkan pesanan sudah dibatalkan
        window.location.reload(); // Reload halaman
      }
    } catch (error) {
      console.error("Error membatalkan pesanan:", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  const getStatusPesanan = (transJual) => {
    // Kondisi pertama: Jika tgl_konfirm_selesai_pembeli tidak null
    if (transJual.tgl_konfirm_selesai_pembeli) {
      return "Pesanan diselesaikan pembeli";
    }

    // Kondisi kedua: Jika tgl_pembatalan_pembeli tidak null dan tgl_pembatalan_penjual null
    if (transJual.tgl_pembatalan_pembeli && !transJual.tgl_pembatalan_penjual) {
      return "Pesanan dibatalkan pembeli";
    }

    // Kondisi ketiga: Jika tgl_pembatalan_pembeli null dan tgl_pembatalan_penjual tidak null
    if (!transJual.tgl_pembatalan_pembeli && transJual.tgl_pembatalan_penjual) {
      return "Pesanan dibatalkan penjual";
    }

    // Kondisi keempat: Jika kedua tanggal pembatalan ada
    if (transJual.tgl_pembatalan_pembeli && transJual.tgl_pembatalan_penjual) {
      const tglPembatalanPembeli = new Date(transJual.tgl_pembatalan_pembeli);
      const tglPembatalanPenjual = new Date(transJual.tgl_pembatalan_penjual);

      // Jika tgl_pembatalan_pembeli lebih awal dari tgl_pembatalan_penjual
      if (tglPembatalanPembeli < tglPembatalanPenjual) {
        return "Pesanan dibatalkan pembeli";
      } else {
        return "Pesanan dibatalkan penjual";
      }
    }

    // Jika tidak ada kondisi yang terpenuhi
    return null;
  };

  return (
    <div className="min-h-screen">
      <div className="w-[85%] mx-auto bg bg-lightbg p-4 my-5 rounded-3xl">
        <Tabs>
          <TabList className={"flex justify-center mb-5"}>
            <Tab>Produk</Tab>
            <Tab>Status Penjualan</Tab>
            <Tab>Pembelian</Tab>
          </TabList>

          {/* produk */}
          <TabPanel>
            <div className="flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
              {userProduks.map((userProduk) => (
                <Link
                  href={`/detail_produk/${userProduk.id_produk}`}
                  key={userProduk.id_produk}
                  className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg"
                >
                  <img
                    src={userProduk.list_url_gambar[0]}
                    alt=""
                    className="h-36 w-full"
                  />
                  <p className="px-2">{userProduk.nama_produk}</p>
                  <p className="text-blue-300 px-2">Rp. {userProduk.harga}</p>
                </Link>
              ))}
            </div>
          </TabPanel>

          {/* penjualan */}
          <TabPanel>
            {transaksiJual.map((transJual) => {
              const statusPesanan = getStatusPesanan(transJual); // Mendapatkan status pesanan

              return (
                <div
                  key={transJual.id_transaksi}
                  className="flex items-center bg-white rounded-lg shadow-md mt-2"
                >
                  {/* Image Section */}
                  <div className="">
                    <img
                      src={transJual.produk.list_url_gambar[0]}
                      alt="Product Image"
                      width={200}
                      height={30}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Status card */}
                  <div className="ml-2">
                    <p>
                      <span className="font-semibold">Nama Produk :</span>
                      {transJual.produk.nama_produk}
                    </p>
                    <p>
                      <span className="font-semibold">Harga Produk :</span>
                      {transJual.produk.harga}
                    </p>
                    <p>
                      <span className="font-semibold">Tanggal Post :</span>
                      {transJual.produk.tanggal_post}
                    </p>

                    {/* Render status pesanan atau tombol batalkan pesanan */}
                    {statusPesanan ? (
                      <p>
                        <span className="font-semibold">Status Pesanan:</span>{" "}
                        {statusPesanan}
                      </p>
                    ) : (
                      <div className="ml-auto mr-4">
                        <button
                          onClick={() => cancelOrder(transJual.id_transaksi)} // Memanggil fungsi cancelOrder
                          className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition"
                        >
                          Batalkan Pesanan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </TabPanel>

          <TabPanel>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="flex items-center bg-white rounded-lg shadow-md mt-2 px-4 py-4">
                {/* Image Section */}
                <div className="">
                  <img
                    src="/images/testimage/image.png"
                    alt="Product Image"
                    width={200}
                    height={30}
                    className="rounded-lg"
                  />
                </div>

                {/* Status Card */}
                <div className="ml-4 flex-1 max-w-md">
                  <p>
                    <span className="font-semibold">Nama Produk</span> : HP
                    INFINIX SMART 5
                  </p>
                  <p>
                    <span className="font-semibold">Harga Produk</span> :
                    Rp.35.700
                  </p>
                  <p>
                    <span className="font-semibold">Deskripsi Produk</span> :
                    Memiliki layar 6,6 inci dengan resolusi 720 x 1600 pixels,
                    dual kamera 8 MP dengan chipset Mediatek Helio A20 (12nm)
                    Octa-Core 1,8 Ghz.
                  </p>
                </div>

                {/* Button Section */}
                <div className="flex items-center space-x-4 ml-auto">
                  <button className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition">
                    Batalkan Pesanan
                  </button>
                  <button className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition">
                    Pesanan Selesai
                  </button>
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
