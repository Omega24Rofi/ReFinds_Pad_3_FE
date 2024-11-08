
"use client";
import { useState, useEffect } from 'react';
import useKategori from '@/hooks/useKategori';
import api from '@/utils/axios';
const FilterProduk = () => {
  const { kategoriData, subkategoriData } = useKategori();
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [selectedSubkategori, setSelectedSubkategori] = useState([]);
  const [antiKategori, setAntiKategori] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

// Toggle pemilihan Kategori dan Subkategori
const handleKategoriChange = (id) => {
    // Memeriksa apakah ID Kategori yang diklik sudah ada di array selectedKategori
    if (selectedKategori.includes(id)) {
        // Jika sudah ada, hapus Kategori tersebut dari selectedKategori
        setSelectedKategori((prev) => {
            const updatedKategori = prev.filter((item) => item !== id); // Menghapus ID Kategori yang tidak terpilih
            console.log("Updated selectedKategori:", updatedKategori); // Menampilkan log selectedKategori setelah diupdate
            return updatedKategori; // Mengembalikan daftar selectedKategori yang telah diperbarui
        });

        // Menghapus semua Subkategori yang terkait dengan Kategori yang tidak terpilih
        setSelectedSubkategori((prev) => {
            const updatedSubkategori = prev.filter((sub) => sub.id_kategori !== id); // Menghapus Subkategori dari Kategori yang tidak terpilih
            console.log("Updated selectedSubkategori:", updatedSubkategori); // Menampilkan log selectedSubkategori setelah diupdate
            return updatedSubkategori; // Mengembalikan daftar selectedSubkategori yang telah diperbarui
        });
    } else {
        // Jika Kategori belum ada dalam selectedKategori, tambahkan ke selectedKategori
        setSelectedKategori((prev) => {
            const updatedKategori = [...prev, id]; // Menambahkan ID Kategori yang baru dipilih
            console.log("Updated selectedKategori:", updatedKategori); // Menampilkan log selectedKategori setelah diupdate
            return updatedKategori; // Mengembalikan daftar selectedKategori yang telah diperbarui
        });

        // Menambahkan semua Subkategori yang terkait dengan Kategori yang dipilih ke selectedSubkategori
        setSelectedSubkategori((prev) => {
            const subkategoriForKategori = subkategoriData.filter((sub) => sub.id_kategori === id); // Mendapatkan Subkategori untuk Kategori yang dipilih
            const updatedSubkategori = [...prev, ...subkategoriForKategori]; // Menambahkan Subkategori yang ditemukan ke selectedSubkategori
            console.log("Updated selectedSubkategori:", updatedSubkategori); // Menampilkan log selectedSubkategori setelah diupdate
            return updatedSubkategori; // Mengembalikan daftar selectedSubkategori yang telah diperbarui
        });
    }
};

// Toggle pemilihan Subkategori individu
const handleSubkategoriChange = (id_subkategori) => {
    setSelectedSubkategori((prev) => {
        // Memeriksa apakah Subkategori sudah ada dalam selectedSubkategori
        const updatedSubkategori = prev.some((sub) => sub.id_subkategori === id_subkategori)
            ? prev.filter((sub) => sub.id_subkategori !== id_subkategori) // Jika sudah ada, hapus dari array
            : [...prev, { id_subkategori }]; // Jika belum ada, tambahkan ke array
        console.log("Updated selectedSubkategori:", updatedSubkategori); // Menampilkan log selectedSubkategori setelah diupdate
        return updatedSubkategori; // Mengembalikan daftar selectedSubkategori yang telah diperbarui
    });
};


  const fetchFilteredProducts = async () => {
      try {
          console.log("Selected Kategori:", selectedKategori);
          console.log("Selected Subkategori:", selectedSubkategori.map(sub => sub.id_subkategori));
          const response = await api.post('/api/produk/filter', {
              array_subkategori: selectedSubkategori.map((sub) => sub.id_subkategori),
              array_kategori: selectedKategori,
              anti_kategori: antiKategori,
          });
          setFilteredProducts(response.data.data);
      } catch (error) {
          console.error("Error fetching filtered products:", error);
      }
  };


    return (
        <div>
            <h1>Filter Produk</h1>
            <div>
                {kategoriData.map((kategori) => (
                    <div key={kategori.id_kategori}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleKategoriChange(kategori.id_kategori)}
                                checked={selectedKategori.includes(kategori.id_kategori)}
                            />
                            {kategori.nama_kategori}
                        </label>
                        <div style={{ marginLeft: '20px' }}>
                            {subkategoriData
                                .filter((sub) => sub.id_kategori === kategori.id_kategori)
                                .map((sub) => (
                                    <label key={sub.id_subkategori}>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSubkategoriChange(sub.id_subkategori)}
                                            checked={selectedSubkategori.some(
                                                (selected) => selected.id_subkategori === sub.id_subkategori
                                            )}
                                        />
                                        {sub.nama_subkategori}
                                    </label>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={fetchFilteredProducts}>Filter</button>

            <h2>Filtered Produk</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id_produk}>
                        <p>{product.nama_produk}</p>
                        <p>{product.id_subkategori}</p>
                        <div>
                            {product.list_url_gambar.map((url, index) => (
                                <img key={index} src={url} alt={product.nama_produk} style={{ width: '100px' }} />
                            ))}
                        </div>
                        <br /><br /><br />
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default FilterProduk;
