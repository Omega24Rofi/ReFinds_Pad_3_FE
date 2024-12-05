"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { formatTanggal } from "@/utils/dateFormatter";
import { formatHarga } from "@/utils/priceFormatter";

const SellerView = () => {
  const token = localStorage.getItem("token");

  // transaksi beli
  const [transaksiBeli, setTransaksiBeli] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction to review

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

  const cancelOrderBySeller = async (id) => {
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

  const cancelOrderByBuyer = async (id) => {
    try {
      // Mengirimkan request ke API untuk membatalkan pesanan
      const response = await api.get(`/api/transaksi/${id}/batalkan-pembeli`, {
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

  
  const selesaikanPesanan = async (id) => {
    // munculmodal()
    // fetch()

    try {
      // Mengirimkan request ke API untuk menyelesaikan pesanan
      const response = await api.get(
        `/api/transaksi/${id}/konfirmasi-selesai-pembeli`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tanggapan sukses
      if (response.status === 200) {
        alert("Pesanan berhasil diselesaikan.");

        // window.location.reload(); // Reload halaman
      }
    } catch (error) {
      console.error("Error menyelesaikan pesanan:", error);
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

 return(
  <div className="min-h-screen">
  <div className="w-[85%] mx-auto bg bg-lightbg p-4 my-5 rounded-3xl">
    <Tabs>
      <TabList className={"flex justify-center mb-5"}>
        <Tab>Produk</Tab>
        <Tab>Status Penjualan</Tab>
        <Tab>Pembelian</Tab>
      </TabList>

      {/* tab users produk */} 
      <TabPanel>
        <div className="flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2">
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
              <p className="text-blue-300 px-2">
                {formatHarga(userProduk.harga)}
              </p>
            </Link>
          ))}
        </div>
      </TabPanel>

      {/* tab transaksi penjualan */}
      <TabPanel>
        {transaksiJual.map((transJual) => {
          const statusPesanan = getStatusPesanan(transJual);

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
                  {formatHarga(transJual.produk.harga)}
                </p>
                <p>
                  <span className="font-semibold">Tanggal Post :</span>
                  {formatTanggal(transJual.produk.tanggal_post)}
                </p>
              </div>

              <div className="flex items-center space-x-4 ml-auto mr-4">
                {statusPesanan ? (
                  <p>
                    <span className="font-semibold pr-4"></span> {statusPesanan}
                  </p>
                ) : (
                  <button
                    onClick={() =>
                      cancelOrderBySeller(transJual.id_transaksi)
                    }
                    className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition"
                  >
                    Batalkan Pesanan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </TabPanel>

      {/* tab transaksi pembelian */}
      <TabPanel>
        {transaksiBeli.map((transBeli) => {
          const statusPesananBeli = getStatusPesanan(transBeli);

          return (
            <div
              key={transBeli.id_transaksi}
              className="flex items-center bg-white rounded-lg shadow-md mt-2"
            >
              {/* Image Section */}
              <div className="">
                <img
                  src={transBeli.produk.list_url_gambar[0]}
                  alt="Product Image"
                  width={200}
                  height={30}
                  className="rounded-lg"
                />
              </div>

              {/* Status card */}
              <div className="ml-4 flex-1 max-w-md">
                <p>
                  <span className="font-semibold">Nama Produk :</span>
                  {transBeli.produk.nama_produk}
                </p>
                <p>
                  <span className="font-semibold">Harga Produk :</span>
                  {formatHarga(transBeli.produk.harga)}
                </p>
                <p>
                  <span className="font-semibold">Tanggal Post :</span>
                  {formatTanggal(transBeli.produk.tanggal_post)}
                </p>

                <p>
                  <span className="font-semibold">Deskripsi Produk :</span>
                  {transBeli.produk.url_teks_deskripsi}
                </p>
              </div>

              {statusPesananBeli ? (
                <div className="flex items-center ml-auto mr-4">
                  <p>
                    <span className="font-semibold"></span>{" "}
                    {statusPesananBeli}
                  </p>
                </div>
              ) : (
                <div className="flex items-center ml-auto mr-4">
                  <button
                    onClick={() =>
                      cancelOrderByBuyer(transBeli.id_transaksi)
                    }
                    className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition"
                  >
                    Batalkan Pesanan
                  </button>

                  <button
                    onClick={() =>
                      selesaikanPesanan(transBeli.id_transaksi)
                    }
                    className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition"
                  >
                    Pesanan Selesai
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </TabPanel>
    </Tabs>
  </div>

  <div className="modal-overlay bg-lightbluemain w-fit p-4">
      <div className="modal">
        <h3 className="text-center font-bold">Penilaian Produk</h3>
        <form action="" method="post">
          <div className="flex gap-2 items-center">
            <label htmlFor="rating1">1</label>
            <input type="radio" name="rating_seller" id="rating1" value={1}/>
            <label htmlFor="rating2">2</label>
            <input type="radio" name="rating_seller" id="rating2"  value={2}/>
            <label htmlFor="rating3">3</label>
            <input type="radio" name="rating_seller" id="rating3"  value={3}/>
            <label htmlFor="rating4">4</label>
            <input type="radio" name="rating_seller" id="rating4"  value={4}/>
            <label htmlFor="rating5">5</label>
            <input type="radio" name="rating_seller" id="rating5"  value={5}/>
          </div>
          <div className="flex items-start">
            <label htmlFor="" className="align-text-top">Ulasan :</label>
            <textarea
              placeholder="Tulis ulasan Anda di sini..."
            ></textarea>
          </div>
          <div className="modal-actions flex gap-2 mx-auto">
            <button className="bg-blue_btn hover:bg_blue_btn text-white font-bold py-2 px-4 rounded-lg">Batal</button>
            <button className="bg-blue_btn hover:bg_blue_btn text-white font-bold py-2 px-4 rounded-lg">Kirim</button>
          </div>
        </form>
      </div>
    </div>
</div>

 );
};

export default SellerView;
