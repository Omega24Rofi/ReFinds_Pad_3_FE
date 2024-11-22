"use client";

import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";
import Image from "next/image";
import Link from "next/link";
// import SplashScreen from "@/app/components/splashScreen";

import { processImage } from "@/utils/processImage"; // Impor utilitas pemrosesan gambar
import useKategori from "@/hooks/useKategori";
import api from "@/utils/axios";

const SubmitProductPage = () => {
  const [userData, setUserData] = useState(null);
  const { kategoriData, subkategoriData } = useKategori();
  const [fileName, setFileName] = useState("");
  const jumlahGambar = 3; // Jumlah gambar produk
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredSubkategoriData, setFilteredSubkategoriData] = useState([]);

  // console.log("kategoriData", kategoriData);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/api/user_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("ResponseData:", response.data); // Log response data
        setUserData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    // data bukan gambar
    id_kategori: "",
    id_subkategori: "",
    id_alamat: "",
    deskripsi: "",
    nama_produk: "",
    harga: "",
    // data array gambar
    gambar_produk: Array(jumlahGambar).fill(null), // Array untuk menyimpan gambar
    gambar_produk_preview: Array(jumlahGambar).fill(null), // Array untuk preview gambar
  });

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

    // Menambahkan gambar ke FormData dengan loop
    formData.gambar_produk.forEach((gambar, index) => {
      if (gambar) {
        data.append(`gambar_produk[]`, gambar); // Append gambar dalam array
      }
    });

    // Isi otomatis dari user data
    data.append("id_user", userData.id_user);

    try {
      const response = await api.post("/api/produk_up", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product submitted successfully!");
      setError("");
      window.location.reload(); // Reload halaman
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

  useEffect(() => {
    if (formData.id_kategori !== undefined && subkategoriData.length > 0) {
      console.log("ID KATEGORI TERPILIH:", formData.id_kategori);

      const filteredData = subkategoriData.filter(
        (subkategori) =>
          subkategori.id_kategori === Number(formData.id_kategori)
      );

      setFilteredSubkategoriData(filteredData);
      console.log("FILTERED DATA", filteredData);
    }
  }, [formData.id_kategori, subkategoriData]);

  // Fungsi untuk menangani perubahan input dari form
  // prosess image
  // membuat preview
  // update constanta gambar_produk

  const handleChange = async (e, index) => {
    const { name, value, files } = e.target;
    const file = files && files[0]; // Ambil file pertama jika ada

    // Memeriksa apakah input adalah file gambar
    if (file && file.type.startsWith("image/")) {
      try {
        const processedImage = await processImage(URL.createObjectURL(file));

        setFormData((prev) => {
          const updatedGambarProduk = [...prev.gambar_produk];
          const updatedPreview = [...prev.gambar_produk_preview];

          // Menggunakan index untuk menentukan posisi gambar dalam array
          updatedGambarProduk[index] = processedImage.processedImage;
          updatedPreview[index] = URL.createObjectURL(
            processedImage.processedImage
          );

          return {
            ...prev,
            gambar_produk: updatedGambarProduk,
            gambar_produk_preview: updatedPreview,
          };
        });
      } catch (error) {
        setError("Terjadi kesalahan saat memproses gambar");
      }
    } else {
      // Update formData untuk input non-gambar
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Simpan nilai input non-gambar
      }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  
  return (
    <div className="min-h-screen">
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

            {/* Kategori */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="id_kategori" className="form-label">
                Kategori:
              </label>
              <select
                type="number"
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="id_kategori"
                name="id_kategori"
                value={formData.id_kategori}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                {kategoriData.length > 0 ? (
                  kategoriData.map((kategori) => (
                    <option
                      key={kategori.id_kategori}
                      value={kategori.id_kategori}
                    >
                      {kategori.nama_kategori}
                    </option>
                  ))
                ) : (
                  <option>No kategori available</option>
                )}
              </select>
            </div>
            {/* Subkategori */}
            <div className="mb-4 grid grid-cols-3 gap-2 items-center">
              <label htmlFor="id_subkategori" className="form-label">
                Subkategori:
              </label>
              <select
                type="number"
                className="form-control col-span-1 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="id_subkategori"
                name="id_subkategori"
                value={formData.id_subkategori}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Pilih Subkategori
                </option>
                {filteredSubkategoriData.length > 0 ? (
                  filteredSubkategoriData.map((subkategori) => (
                    <option
                      key={subkategori.id_subkategori}
                      value={subkategori.id_subkategori}
                    >
                      {subkategori.nama_subkategori}
                    </option>
                  ))
                ) : (
                  <option>No subkategori available</option>
                )}
              </select>
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
                userData &&
                userData.alamat &&
                userData.alamat.length > 0 ? (
                  // Jika alamat ada maka diiterasi
                  userData.alamat.map((alamat) => (
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

            <div>
              {Array.from({ length: jumlahGambar }).map((_, index) => (
                <div key={index} className="mb-3">
                  <label
                    htmlFor={`gambar_produk${index}`}
                    className="form-label"
                  >
                    Gambar Produk {index + 1}{" "}
                    {index === 0 ? "(required)" : "(optional)"}:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id={`gambar_produk${index}`}
                    name={`gambar_produk${index}`}
                    onChange={(e) => handleChange(e, index)}
                    // requied = true, jika gambar index ke 0
                    required={index === 0}
                  />

                  {formData.gambar_produk_preview[index] && (
                    <Image
                      src={formData.gambar_produk_preview[index]}
                      alt={`Gambar Produk ${index + 1}`}
                      width={200}
                      height={200}
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </div>
              ))}
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
