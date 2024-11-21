// utils/formatPhoneNumber.js

/**
 * Fungsi untuk membersihkan dan memformat nomor telepon
 * @param {string} phoneNumber - Nomor telepon dalam format yang tidak terstruktur
 * @returns {string} - Nomor telepon yang sudah diformat
 */
export const formatPhoneNumber = (phoneNumber) => {
    // Menghapus semua karakter selain angka
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  
    // Cek jika nomor telepon diawali dengan '0' (misalnya Indonesia), ganti dengan '62'
    if (cleanedPhoneNumber.startsWith("0")) {
      cleanedPhoneNumber = "62" + cleanedPhoneNumber.slice(1);
    }
  
    // Kembalikan nomor telepon yang sudah dibersihkan dan diformat
    return cleanedPhoneNumber;
  };
  