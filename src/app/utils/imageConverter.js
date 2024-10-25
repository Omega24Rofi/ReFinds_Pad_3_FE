// Function to convert an image to JPG format
export async function imageToJPG(imageFile, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(imageFile); // Create URL for image

    img.src = objectUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the image’s dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to a JPG Blob
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl); // Release the URL object to free memory
          resolve(blob); // Return the JPG blob
        },
        "image/jpeg",
        quality // Set the quality for JPG conversion
      );
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl); // Release URL even on error
      reject(error);
    };
  });
}
