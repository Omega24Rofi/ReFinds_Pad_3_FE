import Link from 'next/link'
import api from '@/utils/axios'; 


const ContactSeller = () => {
  return (
    <div className='min-h-screen'>
        <div className='w-[90%] mx-auto mt-10 bg-lightbg flex flex-row'>
            <div className='h-full'>
                <img src="/images/testimage/image2.png" alt="" className='h-full w-full'/>
            </div>
            <div className='h-full w-[50%] p-5 flex justify-center flex-col'>
                <p className='font-bold text-2xl'>Hp Infinix</p>
                <p className='text-2xl text-[#0087E0] mt-2'>Rp. 2.600.000</p>
                <div className='mt-10'>
                    <p className='font-bold'>Deskripsi produk</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam nostrum optio veniam exercitationem voluptates expedita eum corporis suscipit excepturi natus nemo deleniti voluptas esse non, vitae ullam possimus! Officiis!
                    Consectetur quo, atque quia sequi neque, velit maiores quasi aliquid soluta ad odit. Perspiciatis, ipsum. Aperiam quae saepe earum. Incidunt tempora dolor mollitia nulla officia recusandae, rerum maxime doloribus dicta?</p>
                </div>
                
                <div className='flex flex-row align-middle mt-10 text-center h-fit w-12'>
                    <Link href={"/seller_view"}>
                        <img src="/images/testimage/account_circle.png" alt="" />
                        <p>Seller</p>
                    </Link>
                </div>
                <button className='bg-[#0D96C4] p-2 text-white rounded-lg mt-36 w-24 m-auto'>Pesan</button>
            </div>

        </div>
    </div>
  )
}

export default ContactSeller