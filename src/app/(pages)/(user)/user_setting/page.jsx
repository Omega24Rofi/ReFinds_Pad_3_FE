"use client";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import { processImage } from "@/utils/processImage"; // Impor utilitas pemrosesan gambar

const UserSetting = () => {
  const [user, setUser] = useState({
    nama_akun: "",
    nama_asli_user: "",
    email: "",
    no_telepon: "",
    url_foto_profil: "", // Menyimpan URL foto profil

  });
  const token = localStorage.getItem("token");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/get_user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("RESPINSE: ", response.data);

        // Mengisi otomatis form dengan data dari BE
        setUser({
          nama_akun: response.data[0].nama_akun || "",
          nama_asli_user: response.data[0].nama_asli_user || "",
          email: response.data[0].email || "",
          no_telepon: response.data[0].no_telepon || "",
          url_foto_profil: response.data[0].url_foto_profil || "", // Menyimpan URL foto profil lama

        });

        // Menampilkan foto profil lama di preview jika ada
        setProfilePicturePreview(`${apiBaseUrl}/${response.data[0].url_foto_profil}`); // Menambahkan apiBaseUrl di depan URL foto profil
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0]; // Ambil file pertama
    if (file && file.type.startsWith("image/")) {
      try {
        // Proses gambar menggunakan fungsi processImage
        const processedImage = await processImage(URL.createObjectURL(file));

        setProfilePicture(processedImage.processedImage); // Simpan gambar hasil pemrosesan
        setProfilePicturePreview(
          URL.createObjectURL(processedImage.processedImage)
        ); // Generate preview dari gambar yang sudah diproses
      } catch (error) {
        console.error("Terjadi kesalahan saat memproses gambar:", error);
        alert("Gagal memproses gambar. Harap coba gambar lain.");
      }
    } else {
      alert("Harap pilih file gambar yang valid.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama_akun", user.nama_akun);
      formData.append("nama_asli_user", user.nama_asli_user);
      formData.append("email", user.email);
      formData.append("no_telepon", user.no_telepon);

      if (profilePicture) {
        formData.append("foto_profil", profilePicture); // Tambahkan gambar
      }

      const response = await api.post("/api/update_user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User updated:", response.data); // Log response dari BE

      window.location.reload(); // Ini akan melakukan reload halaman

    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <h1>Edit User Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Akun:</label>
          <input
            type="text"
            name="nama_akun"
            value={user.nama_akun}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nama Asli:</label>
          <input
            type="text"
            name="nama_asli_user"
            value={user.nama_asli_user}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>No Telepon:</label>
          <input
            type="text"
            name="no_telepon"
            value={user.no_telepon}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Foto Profil:
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {profilePicturePreview && (
            <img
              src={profilePicturePreview}
              alt="Preview Foto Profil"
              width={200}
              height={200}
              style={{ marginTop: "10px", borderRadius: "50%" }}
            />
          )}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserSetting;
