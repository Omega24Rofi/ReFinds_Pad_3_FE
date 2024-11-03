"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/app/component/withAuth";
import Image from "next/image";
import Link from "next/link";
import { processImage } from "@/app/utils/processImage"; // Impor utilitas pemrosesan gambar
import useKategori from "@/app/component/useKategori";

const SubmitProductPage = () => {
  const [userData, setUserData] = useState(null);
  const { kategoriData } = useKategori();
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/user_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("ResponseData:", response.data); // Log response data
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Even if there's an error, stop the loading state
      });
  }, []); // This useEffect will run only once when the component is mounted.

  // Additional useEffect
  // useEffect(() => {
  //   // CUMA BUAT LOGGING HEH~
  //   if (userData) {
  //     // console.log("userData updated:", userData); // This will log the updated userData state
  //   }
  // }, [userData]); // This useEffect will run every time userData changes

  const [formData, setFormData] = useState({
    id_subkategori: "",
    id_alamat: "",
    deskripsi: "",
    nama_produk: "",
    harga: "",

    gambar_produk1: null,
    gambar_produk2: null,
    gambar_produk3: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    // memastikan userdata sudah diisi
    if (!userData || userData.length === 0) {
      setError("User data is not loaded. Please try again.");
      return;
    }

    // Create a FormData object to handle file uploads
    const data = new FormData();

    // Ambil dari form
    data.append("id_subkategori", formData.id_subkategori);
    data.append("id_alamat", formData.id_alamat);
    data.append("deskripsi", formData.deskripsi);
    data.append("nama_produk", formData.nama_produk);
    data.append("harga", formData.harga);

    // Gambar Produk
    data.append("gambar_produk1", formData.gambar_produk1);

    // Gambar Produk Maybe Null
    if (formData.gambar_produk2) {
      data.append("gambar_produk2", formData.gambar_produk2);
    }
    if (formData.gambar_produk3) {
      data.append("gambar_produk3", formData.gambar_produk3);
    }

    // Isi otomatis dari user data
    data.append("id_user", userData[0].id_user);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/produk_up",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Product submitted successfully!");
      setError("");
    } catch (err) {
      if (err.response) {
        console.error("Validation Errors:", err.response.data.errors);
        setError(
          err.response.data.message ||
            "Failed to submit product. Please try again."
        );
      } else {
        setError("Failed to submit product. Please try again.");
      }
      setMessage("");
    }
  };

  // Fungsi untuk menangani perubahan input dari form

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // Memeriksa apakah input adalah file gambar
    if (files && files.length > 0) {
      const file = files[0];

      // Validasi tipe file harus berupa gambar
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diperbolehkan");
        return;
      }

      try {
        // Proses gambar (crop, resize, convert ke JPG)
        const processedImage = await processImage(URL.createObjectURL(file));

        // Membaca hasil gambar yang diproses untuk preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            [name]: processedImage.processedImage, // Menyimpan gambar yang telah diproses
            [`${name}_preview`]: reader.result, // Preview dari gambar
          }));
          setFileName(file.name); // Menyimpan nama file yang dipilih
        };

        reader.readAsDataURL(processedImage.processedImage); // Menggunakan file BLOB yang diproses untuk preview
      } catch (error) {
        console.error("Gagal memproses gambar:", error);
        setError("Gagal memproses gambar. Silakan coba lagi.");
      }
    } else {
      // Update formData untuk input non-gambar
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <header className="w-full max-h-fit h-fit py-5 px-10 bg-lightbluemain flex flex-row align-bottom">
        <Link href={"/"}>
          <img
            src="/icons/left_arrow.svg"
            alt="back_arrow"
            className="w-[1:1] w-6 h-full"
          />
        </Link>
        <p className="h-fit ml-4 font-bold text-center align-middle block">
          Jual Barang
        </p>
      </header>
      <div className="flex justify-center align-middle">
        <div className="container mt-4 flex justify-center align-middle ">
          <form
            onSubmit={handleSubmit}
            className="bg-blue_sl w-[90%] p-4 rounded-2xl"
          >
            {/* Nama Produk */}
            <p className="font-bold text-lg mt-4">Detail Barang</p>
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="nama_produk" className="form-label ">
                Nama Produk:
              </label>
              <input
                type="text"
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="nama_produk"
                name="nama_produk"
                maxLength="100"
                value={formData.nama_produk}
                onChange={handleChange}
                required
              />
            </div>

            {/* Harga */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="harga" className="form-label  mr-10">
                Harga (greater than 0):
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="harga"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                min="0.01"
                required
              />
            </div>

            {/* Kategori */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="id_subkategori" className="form-label">
                Kategori:
              </label>
              <input
                type="number"
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="id_subkategori"
                name="id_subkategori"
                value={formData.id_subkategori}
                onChange={handleChange}
                required
              />
            </div>

            {/* Deskripsi */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi :
              </label>
              <textarea
                rows={3}
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Alamat */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="id_alamat" className="form-label">
                Alamat:
              </label>
              <select
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="id_alamat"
                name="id_alamat"
                value={formData.id_alamat}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Pilih alamat
                </option>

                {userData &&
                userData[0] &&
                userData[0].alamat &&
                userData[0].alamat.length > 0 ? (
                  // Jika alamat ada maka diiterasi
                  userData[0].alamat.map((alamat) => (
                    <option key={alamat.id_alamat} value={alamat.id_alamat}>
                      {alamat.nama_lokasi}, Kec. {alamat.kecamatan}, Kota/Kab.{" "}
                      {alamat.kota_kabupaten}, Prov. {alamat.provinsi}, Kode
                      Pos. {alamat.kode_pos}
                    </option>
                  ))
                ) : (
                  // Jika tidak ada maka:
                  <option>No address available</option>
                )}
              </select>
            </div>

            {/* Gambar Produk 1 */}
            <div>
              <div className="mb-3">
                <label htmlFor="gambar_produk1" className="form-label">
                  Gambar Produk 1:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="gambar_produk1"
                  name="gambar_produk1"
                  onChange={handleChange}
                  required
                />

                {/* Preview */}
                {formData.gambar_produk1_preview && (
                  <Image
                    src={formData.gambar_produk1_preview}
                    alt="Gambar Produk 1"
                    width={200}
                    height={200}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </div>

              {/* Gambar Produk 2 */}
              <div className="mb-3">
                <label htmlFor="gambar_produk2" className="form-label">
                  Gambar Produk 2 (optional):
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="gambar_produk2"
                  name="gambar_produk2"
                  onChange={handleChange}
                />
                {formData.gambar_produk2_preview && (
                  <Image
                    src={formData.gambar_produk2_preview}
                    alt="Gambar Produk 2"
                    width={200}
                    height={200}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </div>

              {/* Gambar Produk 3 */}
              <div className="mb-3">
                <label htmlFor="gambar_produk3" className="form-label">
                  Gambar Produk 3 (optional):
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="gambar_produk3"
                  name="gambar_produk3"
                  onChange={handleChange}
                />
                {formData.gambar_produk3_preview && (
                  <Image
                    src={formData.gambar_produk3_preview}
                    alt="Gambar Produk 3"
                    width={200}
                    height={200}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-blue_btn py-1.5 px-6 rounded-lg font-bold text-white"
            >
              Kirim
            </button>
          </form>

          {/* Display messages */}
          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default withAuth(SubmitProductPage);
