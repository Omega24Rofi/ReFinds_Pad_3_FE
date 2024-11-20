"use client";

import React from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import DropdownSetting from "./DropdownSetting";
import 'flowbite/dist/flowbite.min.js';
import { useState } from "react";

const Header = () => {
  const { userDataX } = useAuth();

  const [IsDropDownOpen, SetIsDropDownOpen] = useState(false);

  const toogleDropDown = () => {
    SetIsDropDownOpen(!IsDropDownOpen)
  }

  const logout = () => {
    // clear the token
    localStorage.removeItem('token');
    // redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className="w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky z-[999] ">
      <div className="w-[100%]  flex flex-row items-center justify-between">
        <div className="flex justify-center items-center w-2/12 h-full">
          <Link href={"/"}>
            <img
              src="/images/Logo-blue.png"
              alt="logo-refinds-blue"
              className="h-12 w-auto mr-4"
            />
          </Link>
          <Link href={"/"}>
            <img
              src="/images/text-logosvg.svg"
              alt="logo-refinds-type"
              className="w-auto h-6"
            />
          </Link>
          
          
        </div>
        <div className="w-[50%]  flex items-center">
          <form action="post" className="w-full">
            <label htmlFor="search" className="flex bg-white rounded-xl px-5">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Cari produk berkualitas disini"
                className="w-full p-2 rounded-xl"
              />
              <img src="/icons/search.svg" alt="" className="h-8 my-auto"/>
            </label>
          </form>
        </div>
        <div className="w-1/4 h-full text-white flex items-center space-x-2 px-2 justify-evenly">
          {/* Jika user ada, tampilkan foto profil */}
          {userDataX ? (
            <div className="flex align-middle gap-8">
              <div className="my-auto">
              <Link href={"/post"} className="flex gap-2 bg-blue_btn px-6 py-1 rounded-lg">
                <p className="text-black font-bold text-2xl">+</p>
                <p className="text-white font-bold text-xl">Jual</p>
              </Link>
              </div>
              {/* FOTO PROFIL DLL DILETAKKAN DISINI */}
              
              <div className="relative">

                <button onClick={toogleDropDown}  type="button">
                  <img src="/images/testimage/account_circle.png" alt="Foto Profil" className=" h-[90%] "/>
                </button>

                {IsDropDownOpen && (
                  <div className="z-[99] absolute top-full right-[0.01rem] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700 bg-lightbg rounded-lg">
                        <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2"><Link href={"/user_transaksi_penjualan"} >
                        Profile
                        </Link></li>
                        <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2"><Link href={"/user_setting"}>Setting</Link></li>
                        <li className="w-full px-3 py-2 bg-lightbg "><button onClick={logout} >Sign Out</button></li>
                      </ul>
                  </div>
                )}
              </div>

              

            </div>
          ) : (
            // Jika user tidak ada, tampilkan tombol login
            <div>
              <Link
                href={"/login"}
                className="rounded-md bg-blue_btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue_btn_hover focus:shadow-none active:bg-blue_btn_hover hover:bg-blue_btn_hover active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              >
                Login
              </Link>

              <Link
                href={"/register"}
                className="rounded-md bg-blue_btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue_btn_hover focus:shadow-none active:bg-blue_btn_hover hover:bg-blue_btn_hover active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </header>
    
  );
};

export default Header;
