"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/app/component/withAuth";
import Image from "next/image";

const SubmitProductPage = () => {
  // State to store form input values
  const [userData, setUserData] = useState(null);

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
  useEffect(() => {
    // CUMA BUAT LOGGIN HEH~
    if (userData) {
      // console.log("userData updated:", userData); // This will log the updated userData state
    }
  }, [userData]); // This useEffect will run every time userData changes

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

    // Ensure userData is loaded before submitting
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
          [`${name}_preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Submit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Nama Produk */}
        <div className="mb-3">
          <label htmlFor="nama_produk" className="form-label">
            Nama Produk:
          </label>
          <input
            type="text"
            className="form-control"
            id="nama_produk"
            name="nama_produk"
            maxLength="100"
            value={formData.nama_produk}
            onChange={handleChange}
            required
          />
        </div>

        {/* Harga */}
        <div className="mb-3">
          <label htmlFor="harga" className="form-label">
            Harga (greater than 0):
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            min="0.01"
            required
          />
        </div>

        {/* Kategori */}
        <div className="mb-3">
          <label htmlFor="id_subkategori" className="form-label">
            Kategori:
          </label>
          <input
            type="number"
            className="form-control"
            id="id_subkategori"
            name="id_subkategori"
            value={formData.id_subkategori}
            onChange={handleChange}
            required
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi (optional):
          </label>
          <input
            type="text"
            className="form-control"
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </div>

        {/* Alamat */}
        <div className="mb-3">
          <label htmlFor="id_alamat" className="form-label">
            Alamat:
          </label>
          <select
            className="form-control"
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
                  {alamat.kota_kabupaten}, Prov. {alamat.provinsi}, Kode Pos.{" "}
                  {alamat.kode_pos}
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

            {/* prev 1 */}
            {formData.gambar_produk1_preview ? (
              <Image
                src={formData.gambar_produk1_preview}
                alt="Gambar Produk 1"
                width={200}
                height={200}
                style={{ marginTop: "10px" }}
              />
            ) : null}
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Display messages */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default withAuth(SubmitProductPage);
