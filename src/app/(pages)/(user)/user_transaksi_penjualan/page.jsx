"use client";
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Link from 'next/link';

const SellerView = () => {
  return (
    <div className='min-h-screen'>
        <div className='w-[85%] mx-auto bg bg-lightbg p-4 my-5 rounded-3xl'>
            <Tabs>
                <TabList className={"flex justify-center mb-5"}>
                    <Tab>Produk</Tab>
                    <Tab>Status Penjualan</Tab>
                    <Tab>Pembelian</Tab>
                </TabList>

                <TabPanel >
                    <div className='flex flex-row flex-wrap -mt-10 m-auto py-6 rounded-2xl px-2 justify-evenly'>
                    {Array.from({ length: 14 }).map((_, index) => (
                    <Link href={"/contact_seller"} key={index} className="card min-h-fit bg-white box-content w-40 m-2 rounded-lg">
                        <img src="/images/testimage/image.png" alt="" className="h-36 w-full" />
                        <p className='px-2'>With Hp INFINIX SMART 5</p>
                        <p className="text-blue-300 px-2">Rp. 2.600.000</p>
                    </Link>
                    ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="flex items-center bg-white rounded-lg shadow-md mt-2">
                        {/* Image Section */}
                        <div className="">
                            <img
                            src="/images/testimage/image.png"
                            alt="Product Image"
                            width={200}
                            height={30}
                            className="rounded-lg"
                            />
                        </div>
    
                        {/* Status card */}
                        <div className="ml-2">
                            <p><span className="font-semibold">Nama Produk</span> : HP INFINIX SMART 5</p>
                            <p><span className="font-semibold">Harga Produk</span> : Rp.35.700</p>
                            <p><span className="font-semibold">Tanggal Post</span> : 21 Agustus 2024</p>
                        </div>
                        <div className="ml-auto mr-4">
                        <button className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition">
                            Batalkan Pesanan
                        </button>
                        </div>
                        </div>
                    ))}
  
                </TabPanel>

                <TabPanel>
                  {Array.from({ length: 6 }).map((_, index) => (
                      <div className="flex items-center bg-white rounded-lg shadow-md mt-2 px-4 py-4">
                          {/* Image Section */}
                          <div className="">
                              <img
                                  src="/images/testimage/image.png"
                                  alt="Product Image"
                                  width={200}
                                  height={30}
                                  className="rounded-lg"
                              />
                          </div>

                          {/* Status Card */}
                          <div className="ml-4 flex-1 max-w-md">
                              <p><span className="font-semibold">Nama Produk</span> : HP INFINIX SMART 5</p>
                              <p><span className="font-semibold">Harga Produk</span> : Rp.35.700</p>
                              <p><span className="font-semibold">Deskripsi Produk</span> : Memiliki layar 6,6 inci dengan resolusi 720 x 1600 pixels, dual kamera 8 MP dengan chipset Mediatek Helio A20 (12nm) Octa-Core 1,8 Ghz.</p>
                          </div>

                          {/* Button Section */}
                          <div className="flex items-center space-x-4 ml-auto">
                              <button className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition">
                                  Batalkan Pesanan
                              </button>
                              <button className="bg-[#0D96C4] text-white px-4 py-2 rounded-lg hover:bg-[#0C7BA8] transition">
                                  Pesanan Selesai
                              </button>
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