// utils/dateFormatter.js

export function formatTanggal(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Tambahkan leading zero jika perlu
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan di JavaScript dimulai dari 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
