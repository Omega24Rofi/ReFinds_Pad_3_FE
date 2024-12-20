"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/axios'; 


const ProdukUser = () => {
  const [produk, setProduk] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); 

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await api.get('/api/user/produk', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProduk(response.data.data); // Ambil hanya array produk
      } catch (error) {
        console.error('Error fetching produk:', error);
      }
    };

    if (token) fetchProduk();
  }, [token]);

  return (
    <div>
        <h1>Daftar Produk</h1>
        <div >
            {Array.isArray(produk) && produk.length > 0 ? (
              produk.map((item) => (
                <div key={item.id_produk} className="produk-card">
                    <h2>{item.nama_produk}</h2>
                    <p>Harga: {item.harga}</p>
                    <p>Deskripsi: <a href={item.url_teks_deskripsi} target="_blank" rel="noopener noreferrer">Link Deskripsi</a></p>
                    <p>Status: {item.status_post}</p>
                    <p>Kondisi: {item.kondisi}</p>
                    <p>Visibilitas: {item.visibilitas ? 'Tampil' : 'Tersembunyi'}</p>
                    <br /><br />
                </div>
              ))
            ) : (
              <p>Tidak ada produk untuk ditampilkan</p>
            )}
        </div>
    </div>
  );
};

export default ProdukUser;
