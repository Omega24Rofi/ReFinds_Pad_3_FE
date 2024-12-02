"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
// import useKategori from '@/hooks/useKategori';

const Header = () => {
  const { userDataX } = useAuth();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [IsDropDownOpen, SetIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [IsDropDownOpen2, SetIsDropDownOpen2] = useState(false);
  const dropdownRef2 = useRef(null);

  const toggleDropDown = () => {
    SetIsDropDownOpen((prevState) => !prevState);
  };

  const toggleDropDown2 = () => {
    SetIsDropDownOpen2((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropdownRef2.current &&
      !dropdownRef2.current.contains(event.target)
    ) {
      SetIsDropDownOpen(false);
      SetIsDropDownOpen2(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [maxHarga, setMaxHarga] = useState("");
  const [minHarga, setMinHarga] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = event.target.search.value.trim();

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (searchInput !== "") {
      queryParams.append("keywords", searchInput);
    }

    if (minHarga) {
      queryParams.append("minPrice", minHarga);
    }

    if (maxHarga) {
      queryParams.append("maxPrice", maxHarga);
    }

    // Redirect to the search page with query params
    router.push(`/search?${queryParams.toString()}`);
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
              style={{ paddingLeft: 0 }}
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Cari produk berkualitas disini"
                className="w-full p-2 rounded-xl border-none"
              />
              <button type="submit">
                <img
                  src="/icons/search.svg"
                  alt="Search"
                  className="h-8 my-auto"
                />
              </button>
              <button
                className="flex justify-center ml-2 h-12 relative items-center hover:font-bold hover:scale-105transition"
                onClick={toggleDropDown2}
                type="button"
              >
                <img
                  src="/icons/sm/line.svg"
                  alt=""
                  className="block h-12 mr-2"
                />
                <p>Filter</p>
                <img
                  src="/icons/sm/arrow_down.png"
                  alt=""
                  className="block ml-2"
                />
              </button>

              {/* Dropdown Filter */}
              {IsDropDownOpen2 && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: "0",
                    zIndex: 1000,
                    padding: "20px",
                    backgroundColor: "#E8F6FA",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="text-center font-bold text-lg mb-2">Filter</h3>
                  <div
                    style={{
                      borderBottom: "1px solid #ccc",
                      marginBottom: "10px",
                    }}
                  ></div>
                  <div style={{ marginTop: "10px" }} className="flex">
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        Min Harga:
                        <input
                          type="number"
                          value={minHarga}
                          onChange={(e) => setMinHarga(e.target.value)}
                          placeholder="Rp. Minimal"
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "5px",
                            marginTop: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        Max Harga:
                        <input
                          type="number"
                          value={maxHarga}
                          onChange={(e) => setMaxHarga(e.target.value)}
                          placeholder="Rp. Maximal"
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "5px",
                            marginTop: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      type="submit"
                      style={{
                        marginTop: "15px",
                        padding: "10px",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                      className="bg-blue_btn rounded-lg w-28 mx-auto hover:bg-blue_btn_hover hover:scale-110 transition"
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
                  className="flex gap-2 bg-blue_btn px-6 py-1 rounded-lg hover:bg-blue_btn_hover hover:scale-105 transition"
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
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link
                          href={"/user_transaksi_penjualan"}
                          className="flex gap-2 w-full"
                        >
                          <img src="/icons/sm/acc_sm.svg" alt="" />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link
                          href={"/user_setting"}
                          className="flex gap-1 w-full"
                        >
                          <img src="/icons/sm/setting.svg" alt="" />
                          <p>Setting</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg hover:bg-lightbg_hover">
                        <button onClick={logout} className="flex gap-1 w-full">
                          <img src="/icons/sm/logout.svg" alt="" />
                          <p>Sign Out</p>
                        </button>
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