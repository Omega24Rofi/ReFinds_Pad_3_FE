import { autoCropImage } from "./imageCropper";
import { resizeImage } from "./imageResizer";
import { imageToJPG } from "./imageConverter"; // Import fungsi konversi

export const processImage = async (imageSrc) => {
  try {
    // Crop gambar terlebih dahulu
    const croppedImageBlob = await autoCropImage(imageSrc);

    // Resize gambar hasil crop: output = BLOB
    const resizedImageBlob = await resizeImage(croppedImageBlob);

    // Konversi gambar hasil resize ke format JPG
    const jpgImageBlob = await imageToJPG(resizedImageBlob);
    
    return { processedImage: jpgImageBlob }; // Kembalikan blob gambar JPG
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
