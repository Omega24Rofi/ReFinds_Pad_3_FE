import React from 'react'
import Link from 'next/link';

export const Category = () => {
    const title = "Category";
  return (
    <div className='min-h-screen h-screen'>
        <div className='h-[30%] w-full bg-[#68C7E7] mt-16 -z-[99] relative text-center flex flex-col align-middle justify-center'>
            <img src="/images/categories/categoryof.png" alt="" className='w-60 '/>
            <h1 className='font-bold text-2xl'>{title}</h1>
        </div>
        <div className="w-[80%] bg-lightbg flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly">
            {Array.from({ length: 12 }).map((_, index) => (
                <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                    <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                    <p className='px-2'>With Hp INFINIX SMART 5</p>
                    <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Category;
