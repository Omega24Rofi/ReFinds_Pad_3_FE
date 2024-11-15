"use client";

import React from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import DropdownSetting from "./DropdownSetting";

const Header = () => {
  const { userDataX } = useAuth();

  return (
    <header className="w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky">
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
              
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"  type="button">
                <img src="/images/testimage/account_circle.png" alt="Foto Profil" className=" h-[90%] "/>
              </button>

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
    </header>
  );
};

export default Header;
