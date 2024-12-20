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
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [IsDropDownOpen2, SetIsDropDownOpen2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const toggleDropDown = () => {
    SetIsDropDownOpen(!IsDropDownOpen);
  };

  const toggleDropDown2 = () => {
    SetIsDropDownOpen2(!IsDropDownOpen2);
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
    <header className="w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky z-[999]">
  <div className="w-full flex flex-row items-center justify-between">
    {/* Logo Section */}
    <div className="flex justify-center items-center w-2/12 h-full">
      <Link href={"/"}>
        <img
          src="/images/Logo-blue.png"
          alt="logo-refinds-blue"
          className="logoimg h-12 w-auto sm:mr-0 md:mr-4"
        />
      </Link>
      <Link href={"/"}>
        <img
          src="/images/text-logosvg.svg"
          alt="logo-refinds-type"
          className="logotxt w-auto h-6 hidden md:inline"
        />
      </Link>
    </div>

    {/* Search Form Section */}
    <div className="sm:w-[70%] md:w-[50%] flex items-center sm:mr-4 md:mr-0">
      <form onSubmit={handleSearch} className="w-full">
        <label
          htmlFor="search"
          className="flex bg-white rounded-xl px-5 relative border-none"
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
            className="flex justify-center ml-2 h-12 items-center hover:text-blue_btn transition"
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
              ref={dropdownRef2}
            >
              <h3 className="text-center font-bold text-lg mb-2">Filter</h3>
              <div
                style={{
                  borderBottom: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              ></div>
              <div className="flex mt-2">
                <div className="mr-2">
                  <label className="block mb-1">
                    Min Harga:
                    <input
                      type="number"
                      value={minHarga}
                      onChange={(e) => setMinHarga(e.target.value)}
                      placeholder="Rp. Minimal"
                      className="block w-full p-2 mt-1 border rounded"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-1">
                    Max Harga:
                    <input
                      type="number"
                      value={maxHarga}
                      onChange={(e) => setMaxHarga(e.target.value)}
                      placeholder="Rp. Maximal"
                      className="block w-full p-2 mt-1 border rounded"
                    />
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 text-white bg-blue_btn rounded-lg hover:bg-blue_btn_hover hover:scale-110 transition"
                >
                  Terapkan
                </button>
              </div>
            </div>
          )}
        </label>
      </form>
    </div>

    {/* Hamburger Menu Section */}
    <div className="relative flex items-center md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleHamburgerMenu}
          >
            <img
              src="/icons/hamburger.svg"
              alt="Menu"
              className="h-8 w-8 mr-3"
            />
          </button>

          {isHamburgerOpen && (
            <div className="absolute top-full right-0 z-[1000] bg-white shadow-lg rounded-md p-4 w-64 transition-all">
              <div className="flex flex-col space-y-4">
                {userDataX ? (
                  <>
                    <Link
                      href={"/post"}
                      className="flex items-center gap-2 bg-blue_btn px-4 py-2 rounded-lg hover:bg-blue_btn_hover hover:scale-105 transition"
                    >
                      <p className="text-black font-bold text-2xl">+</p>
                      <p className="text-white font-bold text-xl">Jual</p>
                    </Link>
                    <button onClick={toggleDropDown} className="flex items-center gap-2" >
                      <img
                        src={`${apiBaseUrl}/${userDataX.url_foto_profil}`}
                        alt="Foto Profil"
                        className="h-12 w-12 rounded-full"
                      />
                      <span className="font-semibold">My Profile
                        <img src="/icons/sm/arrow_down.png" alt="" className="ml-2  inline"/>
                      </span>
                    </button>

                    {IsDropDownOpen && (
                      <div className="bg-lightbg p-4 rounded-md shadow-md" >
                        <ul className="space-y-2 text-gray-700">
                          {userDataX.level_account === "admin" && (
                            <li>
                              <Link
                                href={"/admin_dashboard"}
                                className="flex items-center gap-2 hover:text-blue_btn"
                              >
                                <img src="/icons/sm/admin.svg" alt="Admin" />
                                Admin Dashboard
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link
                              href={"/user_transaksi_penjualan"}
                              className="flex items-center gap-2 hover:text-blue_btn"
                            >
                              <img src="/icons/sm/acc_sm.svg" alt="" />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"/user_setting"}
                              className="flex items-center gap-2 hover:text-blue_btn"
                            >
                              <img src="/icons/sm/setting.svg" alt="" />
                              Setting
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={logout}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700"
                            >
                              <img src="/icons/sm/logout.svg" alt="Logout" />
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href={"/login"}
                      className="bg-blue_btn py-2 px-4 rounded-md text-white text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      className="bg-blue_btn py-2 px-4 rounded-md text-white text-center"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex w-1/4 h-full text-white items-center space-x-2 px-2 justify-evenly" >
          {userDataX ? (
            <>
              <Link
                href={"/post"}
                className="flex gap-2 bg-blue_btn px-6 py-1 rounded-lg hover:bg-blue_btn_hover hover:scale-105 transition"
              >
                <p className="text-black font-bold text-2xl">+</p>
                <p className="text-white font-bold text-xl">Jual</p>
              </Link>
              <div className="relative">
                <button onClick={toggleDropDown} type="button">
                  <img
                    src={`${apiBaseUrl}/${userDataX.url_foto_profil}`}
                    alt="Foto Profil"
                    className="h-[48px] rounded-full hidden md:inline"
                  />
                </button>
                {IsDropDownOpen && (
                  <div className="absolute top-full right-0 z-[99] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700 bg-lightbg rounded-lg">
                      {userDataX.level_account === "admin" && (
                        <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                          <Link
                            href={"/admin_dashboard"}
                            className="flex gap-2"
                          >
                            <img src="/icons/sm/admin.svg" alt="" />
                            <p>Admin Dashboard</p>
                          </Link>
                        </li>
                      )}
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link
                          href={"/user_transaksi_penjualan"}
                          className="flex gap-2"
                        >
                          <img src="/icons/sm/acc_sm.svg" alt="" />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link href={"/user_setting"} className="flex gap-1">
                          <img src="/icons/sm/setting.svg" alt="" />
                          <p>Setting</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg hover:bg-lightbg_hover">
                        <button onClick={logout} className="flex gap-1">
                          <img src="/icons/sm/logout.svg" alt="" />
                          <p>Sign Out</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <Link
                href={"/login"}
                className="rounded-md bg-blue_btn py-2 px-4 text-sm text-white ml-2"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="rounded-md bg-blue_btn py-2 px-4 text-sm text-white ml-2"
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