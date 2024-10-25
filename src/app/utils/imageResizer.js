// Fungsi untuk meresize gambar
export async function resizeImage(imageFile) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
  
      img.onload = () => {
        // Atur canvas untuk meresize gambar
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Setel dimensi canvas ke ukuran target
        canvas.width = 700;
        canvas.height = 700;
  
        // Gambar ulang dan resize gambar di atas canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Konversi canvas ke objek Blob (sebagai gambar yang sudah diresize)
        canvas.toBlob((blob) => {
          resolve(blob); // Kembalikan blob hasil resize
        }, imageFile.type || "image/jpeg");
      };
  
      img.onerror = (error) => reject(error); // Tangani kesalahan jika gambar gagal dimuat
    });
  }
  