import React from 'react'
import Link from 'next/link'
import header from './components/Header';

const Homepage = () => {
  return (
      <div>
      <h1>Homepage</h1>
      <ul>
        <li><Link href={"/login"}>Login</Link></li>
        <li><Link href={"/register"}>Register</Link></li>
      </ul>
    </div>
    
    
  )
};

export default Homepage