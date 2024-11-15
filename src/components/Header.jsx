"use client";

import React from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const {userDataX} =useAuth();

  return (
    <header className='w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky'>
      <div className="w-[100%]  flex flex-row items-center justify-between">
        <div className='flex justify-center items-center w-2/12 h-full'>
          <img src="/images/Logo-blue.png" alt="logo-refinds-blue" className='h-12 w-auto mr-4'/>
          <img src="/images/text-logosvg.svg" alt="logo-refinds-type" className='w-auto h-6' />
        </div>
        <div className='w-[50%]  flex items-center'>
          <form action="post" className='w-full'>
            <label htmlFor="search">
              <input type="text" name="search" id="search" placeholder='Cari produk berkualitas disini' className='w-full p-2 rounded-xl'/>
            </label>
          </form>
        </div>
        <div className='w-1/4 h-full text-white flex items-center space-x-2 px-2 justify-evenly'>
        
                {/* Jika user ada, tampilkan foto profil */}
                {userDataX ? (
          <div>
            {/* FOTO PROFIL DILETAKKAN DISINI */}

            <p>ANDA SUDAH LOGIN</p>
            <img src={userDataX.profile_picture_url} alt="Foto Profil" />
            { console.log("URL PROFILE",userDataX.profile_picture_url) }
          </div>
        ) : (

          // Jika user tidak ada, tampilkan tombol login
          <div>
         <Link href={"/login"} className='rounded-md bg-blue_btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue_btn_hover focus:shadow-none active:bg-blue_btn_hover hover:bg-blue_btn_hover active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'>Login</Link>
          
          <Link href={'/register'} className='rounded-md bg-blue_btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue_btn_hover focus:shadow-none active:bg-blue_btn_hover hover:bg-blue_btn_hover active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'>Daftar</Link>
 

          </div>
        )}
          
        </div>
      </div>
    </header> 
  );
}

export default Header;
