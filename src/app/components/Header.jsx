import React from 'react';
import Link from 'next/link';

const header = () => {
  return (
    <header className='w-full h-min  bg-lightbluemain py-2 px-20'>
      <div className="container flex flex-row align-middle justify-evenly">
        <div className='flex justify-evenly align-bottom w-1/4 h-full bg-[red]'>
            <img src="/images/Logo-blue.png" alt="logo-refinds-blue" className='h-12 w-auto'/>
            <img src="/images/text-logosvg.svg" alt="logo-refinds-type" className='w-auto h-6' />
        </div>
        <form action="post">
          <label htmlFor="search">
              <input type="text" name="search" id="search" placeholder='Cari produk berkualitas disini'/>
          </label>
        </form>
      </div>
    </header>
  )
}

export default header