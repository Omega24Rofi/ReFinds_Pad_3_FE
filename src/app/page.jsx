"use client";


import React from 'react';
import Link from 'next/link';

const logout = () => {
  // clear the token
  localStorage.removeItem('token');
  // redirect to login page
  window.location.href = '/pages/auth/login';
};

const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <li><Link href={"/pages/auth/login"}>Login</Link></li>
        <li><Link href={"/pages/auth/register"}>Register</Link></li>
        <li><Link href={"/pages/post"}>POST</Link></li>
        <li><Link href={"/pages/display"}>DISPLAY</Link></li>
        <li><Link href={"/pages/user_data"}>USER DATA</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Homepage;
