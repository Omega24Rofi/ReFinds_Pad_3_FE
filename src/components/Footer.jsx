import React from 'react';

const Footer = () => {
  return (
    <div className="box-border p-8 text-blue_btn bg-lightbluemain w-full flex flex-col md:flex-row justify-around items-start md:items-center">
      {/* Customer Care Section */}
      <div className="w-full md:w-[40%] mb-6 md:mb-0">
        <p className="font-bold text-lg mb-4">Customer Care</p>
        <div className="contact flex flex-col md:flex-row w-full md:w-[75%] justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/icons/round-phone.svg" alt="phone logo" />
              <p>Contact</p>
            </div>
            <p>086277961340</p>
          </div>
          <div>
            <div>
              <a href="mailto:kewiruskmtedi@gmail.com" className="flex items-center gap-2">
                <img src="/icons/email.svg" alt="email logo" />
                <p>Email</p>
              </a>
            </div>
            <p>kewiruskmtedi@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="w-full md:w-[40%]">
        <p className="font-bold text-lg mb-4">Our Social Media</p>
        <ul className="flex flex-wrap md:flex-row gap-4 md:gap-8">
          <li className="flex items-center gap-2">
            <img src="/icons/instagram.svg" alt="ig-logo" />
            <a href="https://www.instagram.com/kewirus_kmtedi?igsh=Mnd0MnQ3NXdieWlr" target='_blank'>Refinds</a>
          </li>
          <li className="flex items-center gap-2">
            <img src="/icons/youtube_icon.svg" alt="yt-logo" />
            <a href="#">Refinds</a>
          </li>
          <li className="flex items-center gap-2">
            <img src="/icons/ic_x.svg" alt="x-logo" />
            <a href="#">Refinds</a>
          </li>
          <li className="flex items-center gap-2">
            <img src="/icons/facebook.svg" alt="facebook-logo" />
            <a href="#">Refinds</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
