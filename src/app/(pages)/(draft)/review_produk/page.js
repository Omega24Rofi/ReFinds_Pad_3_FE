// src/app/review_produk/[id_transaksi]/page.js
"use client";
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const ReviewProdukPage = () => {
  const router = useRouter();
  const { id_transaksi } = router.query; // Mendapatkan id_transaksi dari parameter URL

  // State untuk form ulasan
  const [rating, setRating] = useState(5); // Default rating adalah 5
  const [komentar, setKomentar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi untuk submit ulasan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Kirim data ulasan ke API
      const response = await axios.post('http://localhost:8000/api/ulasan', {
        id_transaksi,
        rating,
        komentar,
        tanggal_ulasan: new Date(), // Tanggal ulasan saat ini
      });

      alert(response.data.message);
      router.push('/success'); // Mengarahkan ke halaman success atau halaman lain setelah submit
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim ulasan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Review Produk</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="komentar">Komentar:</label>
          <textarea
            id="komentar"
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            placeholder="Tulis komentar Anda di sini..."
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>
    </div>
  );
};

export default ReviewProdukPage;



// import Link from 'next/link';

// const OrderCompletePage = ({ id_transaksi }) => {
//   return (
//     <div>
//       <h1>Pesanan Selesai</h1>
//       <Link href={`/review_produk/${id_transaksi}`}>
//         <button>Review Produk</button>
//       </Link>
//     </div>
//   );
// };
