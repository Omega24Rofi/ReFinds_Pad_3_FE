// Fungsi untuk mengonversi gambar menjadi format JPG
export async function imageToJPG(imageFile, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(imageFile); // Buat URL untuk gambar
    img.src = objectUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Setel dimensi canvas sesuai dengan dimensi gambar
      canvas.width = img.width;
      canvas.height = img.height;
      // Gambar ulang gambar di atas canvas
      ctx.drawImage(img, 0, 0);
      // Konversi canvas ke Blob format JPG
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl); // Lepaskan objek URL untuk membebaskan memori
          resolve(blob); // Kembalikan blob JPG
        },
        "image/jpeg",
        quality // Setel kualitas untuk konversi JPG
      );
    };
    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl); // Lepaskan URL bahkan jika terjadi kesalahan
      reject(error);
    };
  });
}
