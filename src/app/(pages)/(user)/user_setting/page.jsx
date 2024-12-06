"use client";
import api from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { processImage } from "@/utils/processImage"; // Import image processing utility

const UserSetting = () => {
  const [user, setUser] = useState({
    nama_akun: "",
    nama_asli_user: "",
    email: "",
    no_telepon: "",
    url_foto_profil: "", // Storing profile picture URL
    alamat: [], // List of addresses
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id_user: "",
    nama_lokasi: "",
    kecamatan: "",
    kota_kabupaten: "",
    provinsi: "",
    kode_pos: "",
    deskripsi: "",
    url_map: null,
    is_default: null,
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); 


  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/user_data", {
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
          alamat: response.data[0].alamat || [], // Setting alamat data
        });
        setNewAddress({
          id_user: response.data[0].id_user,
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

  // Handle form submission to update user data and add address
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

      // Update user data
      const response = await api.post("/api/update_user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User updated:", response.data);

      // Cek apakah alamat perlu ditambahkan
      const addressFields = [
        newAddress.id_user,
        newAddress.nama_lokasi,
        newAddress.provinsi,
        newAddress.kota_kabupaten,
        newAddress.kecamatan,
        newAddress.kode_pos,
        newAddress.deskripsi,
      ];

      // Hanya kirim alamat jika ada perubahan pada alamat
      const isAddressChanged = addressFields.some(
        (field) => field !== "" && field !== null
      );

      if (isAddressChanged) {
        // Validasi alamat hanya jika ada perubahan
        if (
          !newAddress.id_user ||
          !newAddress.nama_lokasi ||
          !newAddress.provinsi ||
          !newAddress.kota_kabupaten ||
          !newAddress.kecamatan ||
          !newAddress.kode_pos ||
          !newAddress.deskripsi
        ) {
          // alert("Semua field alamat harus diisi.");
          window.location.reload();
          return;
        }

        // Validasi kode pos
        const isValidKodePos = /^[0-9]{5,10}$/.test(newAddress.kode_pos);
        if (!isValidKodePos) {
          alert("Kode pos tidak valid! Format: 5-10 angka.");
          return;
        }

        try {
          // Kirimkan data alamat ke API jika ada perubahan
          const addressResponse = await api.post(
            "/api/alamat",
            { ...newAddress },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("New address added:", addressResponse.data);
          alert("Alamat berhasil ditambahkan!");
        } catch (error) {
          console.error("Error adding new address:", error);
          alert("Terjadi kesalahan saat menambahkan alamat.");
        }
      } else {
        console.log("Tidak ada perubahan alamat.");
      }

      // Reset atau navigasi jika perlu
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Gagal menyimpan perubahan.");
    }
  };

  // Modal component to display existing addresses
  const Modal = ({ isOpen, onClose, addresses }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 ">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
          <h3 className="text-xl font-semibold mb-4">Existing Alamat</h3>
          <div className="space-y-2">
            {addresses && addresses.length > 0 ? (
              addresses.map((alamat) => (
                <div
                  key={alamat.id_alamat}
                  className="p-2 mb-2 border rounded bg-gray-100"
                >
                  {alamat.nama_lokasi}, Kec. {alamat.kecamatan}, Kota/Kab.{" "}
                  {alamat.kota_kabupaten}, Prov. {alamat.provinsi}, Kode Pos.{" "}
                  {alamat.kode_pos}
                </div>
              ))
            ) : (
              <div>Tidak ada alamat yg tersedia</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue_btn text-white py-2 px-4 rounded hover:bg-blue_btn_hover"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Setting Akun</h1>
      <div className="bg-lightbg shadow-md rounded p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
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
          <div className="bg-lightbg rounded-xl w-full">
            <div>
              <label className="block text-sm font-medium">Nama Akun</label>
              <input
                type="text"
                name="nama_akun"
                value={user.nama_akun}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-2xl shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nama Asli</label>
              <input
                type="text"
                name="nama_asli_user"
                value={user.nama_asli_user}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-2xl shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-2xl shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">No Telepon</label>
              <input
                type="text"
                name="no_telepon"
                value={user.no_telepon}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-2xl shadow-sm "
              />
            </div>
            <div>
              <label className="block text-sm font-medium mt-2">
                Alamat Tersimpan
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-1 bg-blue_btn border border-gray-300 text-white py-2 px-4 hover:bg-blue_btn_hover rounded-2xl"
              >
                Lihat alamat tersimpan
              </button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addresses={user.alamat}
              />
            </div>
            <div>
              <label className="mt-2 block text-sm font-medium">
                Tambah Alamat
              </label>
              <input
                type="text"
                name="nama_lokasi"
                value={newAddress.nama_lokasi}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, nama_lokasi: e.target.value })
                }
                placeholder="Nama Lokasi"
                className="block w-full border-gray-300 rounded-2xl shadow-sm"
              />
              <input
                type="text"
                name="kecamatan"
                value={newAddress.kecamatan}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, kecamatan: e.target.value })
                }
                placeholder="Kecamatan"
                className="mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
              />
              <input
                type="text"
                name="kota_kabupaten"
                value={newAddress.kota_kabupaten}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    kota_kabupaten: e.target.value,
                  })
                }
                placeholder="Kota/Kabupaten"
                className="block mt-1  w-full border-gray-300 rounded-2xl shadow-sm"
              />
              <input
                type="text"
                name="provinsi"
                value={newAddress.provinsi}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, provinsi: e.target.value })
                }
                placeholder="Provinsi"
                className="block w-full mt-1  border-gray-300 rounded-2xl shadow-sm"
              />
              <input
                type="text"
                name="kode_pos"
                value={newAddress.kode_pos}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, kode_pos: e.target.value })
                }
                placeholder="Kode Pos"
                className="block w-full mt-1 border-gray-300 rounded-2xl shadow-sm"
              />
              <input
                type="text"
                name="deskripsi"
                value={newAddress.deskripsi}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, deskripsi: e.target.value })
                }
                placeholder="Catatan/Deskripsi"
                className="block w-full mt-1  border-gray-300 rounded-2xl shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue_btn text-white py-2 px-4 rounded-2xl hover:bg-blue_btn_hover"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSetting;
