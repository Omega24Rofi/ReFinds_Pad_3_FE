"use client";
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Link from 'next/link';

const SellerView = () => {
  return (
    <div className='min-h-screen'>
        <div className='w-[85%] bg-blue_sec mx-auto mt-5 p-5 rounded-3xl flex flex-row justify-between'>
            <div className='flex flex-row'>
                <div>
                <img src="/images/testimage/account_circle.png" alt="" className='h-15'/>
                </div>
                <div className='ml-2'>
                    <p>Lorem Ipsum</p>
                    <div className='flex flex-row'>
                        <img src="/icons/location.svg" alt="" />
                        <p className='ml-2 mt-2'>Jl. Durian Runtuh</p>
                    </div>
                </div>
            </div>
            <button className='flex flex-row bg-blue_btn rounded-xl'>
                <img src="/icons/chat.svg" alt="" className='h-5'/>
                <p className='text-white font-bold ml-2'>Chat</p>
            </button>
        </div>
        <div className='w-[85%] mx-auto bg bg-lightbg p-4 my-5 rounded-3xl'>
            <Tabs>
                <TabList className={"flex justify-center mb-5"}>
                    <Tab>Produk</Tab>
                    <Tab>Terjual</Tab>
                </TabList>

                <TabPanel >
                    <div className='flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly'>
                    {Array.from({ length: 12 }).map((_, index) => (
                    <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                        <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                        <p className='px-2'>With Hp INFINIX SMART 5</p>
                        <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                    </Link>
                    ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div className="flex items-center bg-white rounded-lg shadow-md mt-2">
                        {/* Image Section */}
                        <div className="">
                            <img
                            src="/images/testimage/image.png"
                            alt="Product Image"
                            width={200}
                            height={50}
                            className="rounded-lg"
                            />
                        </div>
    
                        {/* Text Section */}
                        <div className="ml-2">
                            <p><span className="font-semibold">Nama Produk</span> : HP INFINIX SMART 5</p>
                            <p><span className="font-semibold">Harga Produk</span> : Rp.35.700</p>
                            <p><span className="font-semibold">Tanggal Terjual</span> : 21 Agustus 2024</p>
                            <p><span className="font-semibold">Ulasan</span> : Barang bagus dan sesuai dengan deskripsi yang di cantumkan</p>
                        </div>
                        </div>
                    ))}
                    
                </TabPanel>

            </Tabs>
        </div>
    </div>
  )
}

export default SellerView