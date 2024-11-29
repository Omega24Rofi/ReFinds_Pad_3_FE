// utils/priceFormatter.js

export function formatHarga(amount) {
  if (isNaN(amount)) return "Rp 0"; // Antisipasi jika input bukan angka
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Menghilangkan desimal
  }).format(amount);
}
