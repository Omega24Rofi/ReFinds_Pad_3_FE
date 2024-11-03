// src/app/pages/test-auth/page.jsx
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const TestAuthPage = () => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  // Fungsi untuk fetch data dari endpoint test-auth
  const fetchAuthTest = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      const response = await axios.get('http://localhost:8000/api/test-auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Set hasil user ID dari response jika berhasil
      setUserId(response.data.user_id);
    } catch (error) {
      console.error('Error fetching test auth:', error);
      setError('Failed to authenticate. Please check if the token is valid and try again.');
    }
  };

  // Jalankan fetchAuthTest saat komponen pertama kali dimuat
  useEffect(() => {
    fetchAuthTest();
  }, []);

  return (
    <div>
      <h1>Test Auth Page</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : userId ? (
        <p>Authenticated User ID: {userId}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestAuthPage;
