"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const TransaksiPenjualan = () => {
  const [transaksiJual, setTransaksiJual] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransaksiJual = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/transaksi/penjualan', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setTransaksiJual(response.data); 
      } catch (error) {
        console.error('Error fetching transaksi penjualan:', error);
      }
    };

    if (token) fetchTransaksiJual();
  }, [token]);

  return (
    <div>
      <h1>Daftar Transaksi Penjualan</h1>
      <div className="transaksi-list">
        {
          transaksiJual.map((transaksi) => (
            <div key={transaksi.id_transaksi} className="transaksi-card">
              <p>ID Produk: {transaksi.id_produk}</p>
              <p>ID User: {transaksi.id_user}</p>
              <p>Jumlah: {transaksi.jumlah}</p>
              <p>Status: {transaksi.status}</p>
              <br /><br />
              {/* iterasi data lain */}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TransaksiPenjualan;
