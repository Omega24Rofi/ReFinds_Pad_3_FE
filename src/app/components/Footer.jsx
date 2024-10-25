import React from 'react'

const Footer = () => {
  return (
    <div className='h-[25%] box-border p-8 text-blue_btn bg-lightbluemain  w-full flex flex-row justify-around align-middle'>
        <div className='w-[40%]'>
            <p className='font-bold text-lg'>Customer Care</p>
            <div className='contact flex flex-row w-[75%] justify-between'>
                <div>
                    <div className='flex justify-evenly'>
                        <img src="/icons/round-phone.svg" alt="phone logo" />
                        <p>Contact</p>
                    </div>
                    <p>086277961340</p>
                </div>
                <div>
                    <div className='email'>
                    <div className="flex justify-evenly">
                        <img src="/icons/email.svg" alt="email phone" />
                        <p>Email</p>
                    </div>
                    <p>RefindsBuy@mail.com</p>
                </div>
                
            </div>
            </div>
        </div>
        <div className='w-[40%]'>
            <p>Our Social Media</p>
            <ul className='flex flex-row w-full  justify-between'>
                <li className='flex flex-row'>
                    <img src="/icons/instagram.svg" alt="ig-logo" className='mr-2'/>
                    <a>Refinds</a>
                </li>
                <li className='flex flex-row'>
                    <img src="/icons/youtube_icon.svg" alt="yt-logo" className='mr-2'/>
                    <a>Refinds</a>
                </li>
                <li className='flex flex-row'>
                    <img src="/icons/ic_x.svg" alt="x-logo" className='mr-2' />
                    <a>Refinds</a>
                </li>
                <li className='flex flex-row'>
                    <img src="/icons/facebook.svg" alt="facebook-logo" />
                    <a>Refinds</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer;
