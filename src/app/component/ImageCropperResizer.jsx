import React, { useState } from 'react';
import Cropper from 'react-image-crop'; 
import 'react-image-crop/dist/ReactCrop.css'; 
import Resizer from 'react-image-file-resizer';

const ImageResizerAndCropper = ({ onImageProcessed }) => {
  // State untuk mengelola area crop, gambar yang diupload, dan URL gambar yang telah dicrop
  const [crop, setCrop] = useState({ aspect: 1 }); 
  const [image, setImage] = useState(null); 
  const [croppedImageUrl, setCroppedImageUrl] = useState(null); 

  // Fungsi untuk menangani pengunggahan gambar dan menyimpan data URL gambar ke state
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => setImage(reader.result); 
    reader.readAsDataURL(file); 
  };

  // Fungsi untuk mengubah ukuran gambar sambil menjaga rasio aspek gambar
  const resizeImage = (image, width, height) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        image,
        width,
        height,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri); 
        },
        'base64'
      );
    });
  };

  // Fungsi untuk menangani proses crop dan resize gambar
  const handleCropComplete = async (crop) => {
    if (image && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(image, crop); 
      const resizedImage = await resizeImage(croppedImage, 800, 800); 
      setCroppedImageUrl(resizedImage); 
      onImageProcessed(resizedImage); 
    }
  };

  // Fungsi untuk mengambil gambar yang dicrop menggunakan elemen canvas
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas'); 
    const scaleX = image.naturalWidth / image.width; 
    const scaleY = image.naturalHeight / image.height; 
    canvas.width = crop.width; 
    canvas.height = crop.height; 
    const ctx = canvas.getContext('2d'); 

    // Menggambar bagian yang dipotong ke dalam canvas
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Mengembalikan gambar dalam format Blob (JPEG)
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob); 
      }, 'image/jpeg');
    });
  };

  return (
    <div>
      {/* Input file untuk mengunggah gambar */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {/* Komponen Cropper untuk memilih area yang akan dicrop */}
      {image && (
        <Cropper
          src={image}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)} 
          onComplete={handleCropComplete} 
        />
      )}
      
      {/* Menampilkan gambar yang telah dicrop dan diubah ukurannya */}
      {croppedImageUrl && <img src={croppedImageUrl} alt="Cropped and Resized Image" />}
    </div>
  );
};

export default ImageResizerAndCropper;
