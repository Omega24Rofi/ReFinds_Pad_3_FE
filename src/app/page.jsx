import React from 'react'
import Link from 'next/link'

const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <li><Link href={"/pages/auth/login"}>Login</Link></li>
        <li><Link href={"/pages/auth/register"}>Register</Link></li>
      </ul>
    </div>
    
  )
};

export default Homepage