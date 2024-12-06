import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DetailPopUp = ({ trigger, productName, price, description, imageUrl }) => (
  <Popup trigger={trigger} modal nested className="popup-content" overlayStyle={{ background: 'rgba(0, 0, 0, 0)' }}>
    {close => (
      <div className="flex items-center justify-center h-screen bg-transparent">
        <div className="bg-lightbg rounded-xl p-6 max-w-lg mx-auto shadow-lg">
          <div className="content">
            <p className="font-bold">Detail Produk</p>
            <img src={imageUrl} alt={productName} className="h-48 mx-auto mb-4"/>
            <div>
              <p>Nama Produk: {productName}</p>
              <p>Harga: {price}</p>
              <p>Deskripsi produk: {description}</p>
            </div>
          </div>
          <div>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl block mx-auto mt-5"
              onClick={() => close()}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )}
  </Popup>
);

export default DetailPopUp;