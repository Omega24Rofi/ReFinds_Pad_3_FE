import React from 'react';
import "../../../globals.css";
import Image from 'next/image';

const Register = () => {
  return (
    <div className='bg-lightbg min-h-screen flex items-center justify-center'>
        <div className='container w-2/3 h-96 bg-white flex items-start '>
            <div className="logside w-2/3 p-8">
                <h1 className='font-bold text-2xl mb-4'>Register</h1>
                <form action="" method="post">
                  <label htmlFor="email" className='block mb-4'>
                    Email
                    <input type="email" name="email" id="email" placeholder='email' className='border p-2 w-full mt-2'/>
                  </label>
                  <label htmlFor="password" className='block mb-4'>
                    Password
                    <input type="password" name="password" id="password" placeholder='password' className='border p-2 w-full mt-2'/>
                  </label>
                  <label htmlFor="Username" className='block mb-4'>
                    Password
                    <input type="text" name="password" id="password" placeholder='password' className='border p-2 w-full mt-2'/>
                  </label>
                  <label htmlFor="nama" className='block mb-4'>
                    Password
                    <input type="text" name="password" id="password" placeholder='password' className='border p-2 w-full mt-2'/>
                  </label>
                </form>
            </div>
            <div className="colorcard w-1/3 bg-login-gradient h-full flex items-center justify-center">
                <img src="/images/Logo-White.svg" alt="Refinds Logo" className='w-2/5'/>
            </div>
        </div>
    </div>
  )
}

export default Register;
