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

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/get_user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          nama_akun: response.data[0].nama_akun || "",
          nama_asli_user: response.data[0].nama_asli_user || "",
          email: response.data[0].email || "",
          no_telepon: response.data[0].no_telepon || "",
          url_foto_profil: response.data[0].url_foto_profil || "",
        });

        setProfilePicturePreview(
          `${apiBaseUrl}/${response.data[0].url_foto_profil}`
        );
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
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const processedImage = await processImage(URL.createObjectURL(file));
        setProfilePicture(processedImage.processedImage);
        setProfilePicturePreview(
          URL.createObjectURL(processedImage.processedImage)
        );
      } catch (error) {
        console.error("Error processing image:", error);
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
        formData.append("foto_profil", profilePicture);
      }

      const response = await api.post("/api/update_user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User updated:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Setting Akun</h1>
      <div className="bg-lightbg shadow-md rounded p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profilePicturePreview || "/default-profile.png"}
              alt="Preview Foto Profil"
              className="w-28 h-28 rounded-full object-cover"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                name="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <span className="text-blue-500 hover:underline">Edit Foto</span>
            </label>
          </div>
          <div className="bg-lightbg rounded-xl">
            <div>
              <label className="block text-sm font-medium">Nama Akun</label>
              <input
                type="text"
                name="nama_akun"
                value={user.nama_akun}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nama Asli</label>
              <input
                type="text"
                name="nama_asli_user"
                value={user.nama_asli_user}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">No Telepon</label>
              <input
                type="text"
                name="no_telepon"
                value={user.no_telepon}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSetting;
