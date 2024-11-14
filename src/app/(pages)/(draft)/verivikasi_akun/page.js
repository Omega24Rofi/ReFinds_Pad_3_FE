"use client";
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Pengguna meminta verifikasi akun. Sistem akan membuat token dan mengirimkan email ke pengguna berisi link verifikasi 
// (http://localhost:3000/verify_account/{token}).
// Pengguna klik link tersebut yang membawa mereka ke halaman Next.js verify_account/[token].js.
// Frontend Next.js akan mengirimkan token ke backend Laravel melalui API (POST /api/account/verify).
// Backend memverifikasi token dan mengubah status akun pengguna jika token valid.


const VerifyAccount = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      axios.post('http://localhost:8000/api/account/verify', { token })
        .then(response => {
          setStatus(response.data.message);
        })
        .catch(error => {
          setStatus(error.response.data.message || 'Verification failed.');
        });
    }
  }, [token]);

  return (
    <div>
      <h1>Account Verification</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyAccount;
