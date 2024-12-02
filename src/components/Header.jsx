"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import api from '@/utils/axios';
import useKategori from '@/hooks/useKategori';

const Header = () => {
  const { userDataX } = useAuth();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [IsDropDownOpen, SetIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [IsDropDownOpen2, SetIsDropDownOpen2] = useState(false);
  const dropdownRef2 = useRef(null);

  const toggleDropDown = () => {
    SetIsDropDownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      SetIsDropDownOpen(false);
    }
  };
  const toggleDropDown2 = () => {
    SetIsDropDownOpen2((prevState) => !prevState);
  };

  const handleClickOutside2 = (event) => {
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      SetIsDropDownOpen2(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside || handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside || handleClickOutside2);
    };
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = event.target.search.value;
    if (searchInput.trim() !== "") {
      router.push(`/builder?keywords=${encodeURIComponent(searchInput)}`);
    }
  };


const { kategoriData, subkategoriData } = useKategori();
const [selectedKategori, setSelectedKategori] = useState([]);
const [selectedSubkategori, setSelectedSubkategori] = useState([]);
const [antiKategori, setAntiKategori] = useState(false);
const [filteredProducts, setFilteredProducts] = useState([]);
const [maxHarga, setMaxHarga] = useState('');
const [minHarga, setMinHarga] = useState('');

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
          max_harga: maxHarga ? parseFloat(maxHarga) : null,
          min_harga: minHarga ? parseFloat(minHarga) : null,
      });
      setFilteredProducts(response.data.data);
  } catch (error) {
      console.error("Error fetching filtered products:", error);
  }
};



  return (
    <header className="w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky z-[999] ">
      <div className="w-[100%] flex flex-row items-center justify-between">
        <div className="flex justify-center items-center w-2/12 h-full">
          <Link href={"/"}>
            <img
              src="/images/Logo-blue.png"
              alt="logo-refinds-blue"
              className="logoimg h-12 w-auto mr-4"
            />
          </Link>
          <Link href={"/"}>
            <img
              src="/images/text-logosvg.svg"
              alt="logo-refinds-type"
              className="logotxt w-auto h-6"
            />
          </Link>
        </div>
        <div className="w-[50%] flex items-center">
  <form onSubmit={handleSearch} className="w-full">
    <label
      htmlFor="search"
      className="flex bg-white rounded-xl px-5 border-none relative"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Cari produk berkualitas disini"
        className="w-full p-2 rounded-xl border-none"
      />
      <img src="/icons/search.svg" alt="" className="h-8 my-auto" />
      <button
        className="flex items-center text-center justify-center ml-2 h-12 relative"
        onClick={toggleDropDown2}
        type="button"
      >
        <img src="/icons/sm/line.svg" alt="" className="block h-12" />
        <p className="block px-2">Filter</p>
        <img src="/icons/sm/arrow_down.png" alt="" className="block" />
      </button>

      {/* Dropdown Filter */}
      {IsDropDownOpen2 && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            right: '0',
            zIndex: 1000,
            padding: '20px',
            backgroundColor: '#E8F6FA',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Filter</h3>
          <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
          {/* {kategoriData.map((kategori) => (
            <div key={kategori.id_kategori} style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>
                <input
                  type="checkbox"
                  onChange={() => handleKategoriChange(kategori.id_kategori)}
                  checked={selectedKategori.includes(kategori.id_kategori)}
                  style={{ marginRight: '5px' }}
                />
                {kategori.nama_kategori}
              </label>
              <div style={{ marginLeft: '20px', marginTop: '5px' }} className="flex">
                {subkategoriData
                  .filter((sub) => sub.id_kategori === kategori.id_kategori)
                  .map((sub) => (
                    <label
                      key={sub.id_subkategori}
                      style={{ display: 'block', marginBottom: '5px' }}
                    
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleSubkategoriChange(sub.id_subkategori)}
                        checked={selectedSubkategori.some(
                          (selected) => selected.id_subkategori === sub.id_subkategori
                        )}
                        style={{ marginRight: '2px', marginLeft : '5px'}}
                      />
                      {sub.nama_subkategori}
                    </label>
                  ))}
              </div>
            </div>
          ))} */}
          <div style={{ marginTop: '10px' }} className="flex gap-2">
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Min Harga:
                <input
                  type="number"
                  value={minHarga}
                  onChange={(e) => setMinHarga(e.target.value)}
                  placeholder="Rp. Minimal"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '5px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Max Harga:
                <input
                  type="number"
                  value={maxHarga}
                  onChange={(e) => setMaxHarga(e.target.value)}
                  placeholder="Rp. Maximal"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '5px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </label>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={fetchFilteredProducts}
              style={{
                marginTop: '15px',
                padding: '10px',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              className="bg-blue_btn rounded-lg w-28 mx-auto"
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </label>
  </form>
</div>

        <div className="w-1/4 h-full text-white flex items-center space-x-2 px-2 justify-evenly">
          {userDataX ? (
            <div className="flex align-middle gap-8">
              <div className="my-auto">
                <Link
                  href={"/post"}
                  className="flex gap-2 bg-blue_btn px-6 py-1 rounded-lg"
                >
                  <p className="text-black font-bold text-2xl">+</p>
                  <p className="text-white font-bold text-xl">Jual</p>
                </Link>
              </div>
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropDown} type="button">
                  <img
                    src={`${apiBaseUrl}/${userDataX.url_foto_profil}`}
                    alt="Foto Profil"
                    className="h-[48px] rounded-full"
                  />
                </button>
                {IsDropDownOpen && (
                  <div className="z-[99] absolute top-full right-[0.01rem] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700 bg-lightbg rounded-lg">
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2">
                        <Link href={"/user_transaksi_penjualan"}>Profile</Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2">

                        <Link href={"/user_setting"}>Setting</Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg ">
                        <button onClick={logout}>Sign Out</button>
                      </li>
                    </ul>
                    


                  </div>


                )}
              </div>
              
            </div>
          ) : (
            <div>
              <Link
                href={"/login"}
                className="rounded-md bg-blue_btn py-2 px-4 text-center text-sm text-white ml-2"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="rounded-md bg-blue_btn py-2 px-4 text-center text-sm text-white ml-2"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;