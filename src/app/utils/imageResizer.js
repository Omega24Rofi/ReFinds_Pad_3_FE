export async function resizeImage(imageFile) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      // Set up canvas to resize the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the target size
      canvas.width = 700;
      canvas.height = 700;

      // Draw and resize the image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Blob object (as a resized image)
      canvas.toBlob((blob) => {
        resolve(blob);
      }, imageFile.type || "image/jpeg");
    };

    img.onerror = (error) => reject(error);
  });
}
