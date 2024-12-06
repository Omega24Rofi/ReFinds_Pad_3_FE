"use client";
import api from "@/utils/axios";
import { useEffect, useState } from 'react';

const TransaksiPembelian = () => {
  const [transaksiBeli, setTransaksiBeli] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); 

  useEffect(() => {
    const fetchTransaksiBeli = async () => {
      try {
        const response = await api.get('/api/transaksi/pembelian', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setTransaksiBeli(response.data); 
      } catch (error) {
        console.error('Error fetching transaksi pembelian:', error);
      }
    };

    if (token) fetchTransaksiBeli();
  }, [token]);

  return (
    <div>
      <h1>Daftar Transaksi Pembelian</h1>
      <div className="transaksi-list">
        {/* iterasi data transaksiBeli untuk menampilkannya */}
        {
          transaksiBeli.map((transaksi) => (
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

export default TransaksiPembelian;
