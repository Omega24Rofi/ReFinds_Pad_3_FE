"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const logout = () => {
  // clear the token
  localStorage.removeItem('token');
  // redirect to login page
  window.location.href = '/login';
};

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[100vh] mx-auto overflow-hidden">
      {/* Carousel Content */}
      <div className="w-full h-full flex transform transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ❯
      </button>
    </div>
  );
};

const Homepage = () => {
  const slides = [
    "/images/main_slider/sliderr3.png",
    "/images/main_slider/slider2.png",
    "/images/main_slider/slider1.png", 
  ];

  return (
    <div className='min-h-screen'>
      {/* Carousel */}
      <Carousel slides={slides} />
      <div className='w-full justify-center align-middle mt-5'>
        <div className='flex flex-row gap-8 h-28 align-middle justify-center'>
          <Link href={"/category"} className='bg-white rounded-2xl shadow-lg p-2' >
            <img src="/images/categories/Two white plates with blue rim.png" alt="alat rumah tangga" />
          </Link>
          <Link href={"/category"}className='bg-white rounded-2xl shadow-lg p-2'>
            <img src="/images/categories/laptop white screen.png" alt="elektronik" />
          </Link>
          <Link href={"/category"} className='bg-white rounded-2xl shadow-lg p-2'>
            <img src="/images/categories/green sofa with two pillows.png" alt="perabotan" className=''/>
          </Link>
          <Link href={"/category"}  className='bg-white rounded-2xl shadow-lg p-2 '>
            <img src="/images/categories/t-shirt mockup.png" alt="pakaian & outfit lainnya"/>
          </Link>
        </div>
      </div>

      <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
            
            {Array.from({ length: 6 }).map((_, index) => (
                <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                    <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                    <p className='px-2'>With Hp INFINIX SMART 5</p>
                    <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                </Link>
            ))}
        </div>

        <div className="w-[80%] bg-lightbg flex flex-row flex-wrap mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
            
            {Array.from({ length: 30 }).map((_, index) => (
                <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                    <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                    <p className='px-2'>With Hp INFINIX SMART 5</p>
                    <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                </Link>
            ))}
        </div>

      <h1>Homepage</h1>
      <ul>
        <li><Link href={"/login"}>Login</Link></li>
        <li><Link href={"/register"}>Register</Link></li>
        <li><Link href={"/post"}>POST</Link></li>
        <li><Link href={"/display"}>DISPLAY</Link></li>
        <li><Link href={"/user_data"}>USER DATA</Link></li>
        {/* <li><Link href={"/admin_acc"}>ADMIN ACC</Link></li> */}
        <li><Link href={"/admin_dashboard"}>Admin DashBoard</Link></li>
        <li><Link href={"/dashboard"}>DashBoard</Link></li>
        <li><Link href={"/dashboard"}>DashBoard</Link></li>

        <br /><br />
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Homepage;
