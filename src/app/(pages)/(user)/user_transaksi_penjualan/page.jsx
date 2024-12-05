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
  const [isModalOpen, setModalOpen] = useState(false);
  const [idTransaksi, setIdTransaksi] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction to review

  const openModal = (id) => {
    setModalOpen(true)
    setIdTransaksi(id)
    selesaikanPesanan(id)
  };
  const closeModal = () => setModalOpen(false);


  const sendUlasan = (e) => {
    e.preventDefault();
  
    // Get the form data
    const form = document.getElementById('form-ulasan');
    const formData = new FormData(form);
  
    // Get the values for rating, komentar (review), and id_transaksi
    const rating = formData.get('rating');
    const komentar = formData.get('komentar');
    const idTransaksi = formData.get('id_transaksi');
  
    // Prepare the data object
    const ulasanData = {
      rating: rating,
      komentar: komentar,
      id_transaksi: idTransaksi,
    };
  
    // Send the request using fetch
    fetch('http://localhost:8000/api/ulasan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ulasanData),
    })
    .then((response) => response.json()) // Assuming the API responds with JSON
    .then((data) => {
      alert('Ulasan dikirim');
      console.log('Response from server:', data);
      window.location.reload(); // Reload halaman
    })
    .catch((error) => {
      console.error('Error submitting ulasan:', error);
    });
  };

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
              className="hover:scale-90 card sm:h-72 min-h-fit h-64 bg-white box-content sm:w-[13rem] md:w-[11.4rem] m-2 rounded-lg overflow-hidden shadow-md"
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
                <div className="flex items-center ml-auto mr-4 gap-2">
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
                      openModal(transBeli.id_transaksi)
                    }
                    className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition"
                  >
                    Pesanan Selesai
                  </button>

                          {/* modal rating */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-overlay bg-lightbluemain w-fit p-4 rounded-lg">
            <div className="modal">
              <h3 className="text-center font-bold">Penilaian Produk</h3>
              <form id="form-ulasan" onSubmit={sendUlasan}>
                {/* Placeholder Image */}
                <img
                  src={transBeli.produk.list_url_gambar[0]}
                  alt="Produk"
                  className="h-40 p-2 block mx-auto"
                />
                {/* Rating Options */}
                <div className="flex gap-2 items-center mb-4">
                  <p>Pelayanan Penjual :</p>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="flex items-center gap-1">
                      <input type="radio" name="rating" value={rating} />
                      {rating}
                    </label>
                  ))}
                </div>
                {/* Review Input */}
                <div className="flex items-start">
                  <label htmlFor="review" className="align-text-top mr-4">
                    Ulasan:
                  </label>
                  <input type="hidden" name="id_transaksi" value={idTransaksi} />
                  <textarea
                    id="review"
                    name="komentar"
                    placeholder="Tulis ulasan Anda di sini..."
                    className="border rounded-lg p-2 w-full"
                  ></textarea>
                </div>
                {/* Modal Actions */}
                <div className="modal-actions mx-auto w-full flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-blue_btn hover:bg_blue_btn text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Kirim
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
                </div>
              )}
            </div>
          );
        })}
      </TabPanel>
    </Tabs>


  </div>


</div>

 );
};

export default SellerView;
