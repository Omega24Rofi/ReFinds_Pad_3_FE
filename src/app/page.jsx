"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const logout = () => {
  // clear the token
  localStorage.removeItem('token');
  // redirect to login page
  window.location.href = '/pages/auth/login';
};

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
      {/* Carousel Content */}
      <div className="w-full flex transition-transform transform" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
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
    "/images/main_slider/slider1.png", // Add paths to your images
  ];

  return (
    <div>
      {/* Carousel */}
      <Carousel slides={slides} />

      <h1>Homepage</h1>
      <ul>
        <li><Link href={"/login"}>Login</Link></li>
        <li><Link href={"/register"}>Register</Link></li>
        <li><Link href={"/post"}>POST</Link></li>
        <li><Link href={"/display"}>DISPLAY</Link></li>
        <li><Link href={"/user_data"}>USER DATA</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Homepage;
