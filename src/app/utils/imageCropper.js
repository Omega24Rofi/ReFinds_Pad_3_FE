export const autoCropImage = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const minSize = Math.min(image.width, image.height);
      const cropX = (image.width - minSize) / 2;
      const cropY = (image.height - minSize) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = minSize;
      canvas.height = minSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, cropX, cropY, minSize, minSize, 0, 0, minSize, minSize);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas cropping failed"));
        }
      });
    };

    image.onerror = (error) => reject(error);
  });
};
