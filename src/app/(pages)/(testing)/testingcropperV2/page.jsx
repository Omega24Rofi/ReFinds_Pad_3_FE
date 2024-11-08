"use client";
import React, { useState, useEffect } from "react";
import { processImage } from "@/utils/processImage";

// Komponen utama
const YourPage = () => {
  // State Untuk menyimpan Output URL gambar hasil processing
  const [processedImageUrl, setProcessedImageUrl] = useState(null);


  // Fungsi untuk memproses gambar
  const handleProcessImage = async () => {
    // Path gambar sumber
    const imageSrc = "/images/testing/hyakkisaifilterV4_ph.png";

    // Fungsi untuk memproses gambar
    const { processedImage } = await processImage(imageSrc);

    // Set URL gambar hasil processing ke state
    setProcessedImageUrl(URL.createObjectURL(processedImage));
  };


  // Effect untuk memproses gambar saat komponen dimuat
  useEffect(() => {
    // Memanggil fungsi untuk memproses gambar
    handleProcessImage();
  }, []); // ketika komponen dimuat

  return (
    <div>
      <div>
        <h1>Cropped Image</h1>
        {/* Tampilkan gambar hasil cropping jika URL ada */}
        {processedImageUrl && <img src={processedImageUrl} alt="Cropped Image" />}
      </div>
    </div>
  );
};

export default YourPage;
