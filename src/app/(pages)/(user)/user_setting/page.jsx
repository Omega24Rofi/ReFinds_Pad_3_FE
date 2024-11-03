"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserSetting = () => {
  const [user, setUser] = useState({
    nama_akun: '',
    nama_asli_user: '',
    email: '',
    no_telepon: '',
    url_foto_profil: '',
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("RESPINSE: ", response.data);
        
        // Set state with default values if necessary
        setUser({
          nama_akun: response.data[0].nama_akun || '',
          nama_asli_user: response.data[0].nama_asli_user || '',
          email: response.data[0].email || '',
          no_telepon: response.data[0].no_telepon || '',
          url_foto_profil: response.data[0].url_foto_profil || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/update_user', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User updated:', response.data);
      // Optionally handle success (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error('Error updating user data:', error);
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
        <div>
          <label>URL Foto Profil:</label>
          <input
            type="text"
            name="url_foto_profil"
            value={user.url_foto_profil}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserSetting;
