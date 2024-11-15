"use client";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import api from '@/utils/axios'; 


const UserPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      api.get("/api/user_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response Data:", response.data); // Log response data
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  console.log("USER DATA STATE:", userData); // Log state userData

  return (
    <div>
      <h1>User Page</h1>
      {userData && userData.length > 0 ? ( // Periksa jika userData ada dan memiliki elemen
        <div>
          <p>Name: {userData[0].nama_akun}</p>{" "}
          {/* Akses elemen pertama dari array */}
          <p>Email: {userData[0].email}</p>{" "}
          {/* Akses elemen pertama dari array */}
          <h2>Addresses:</h2>
          {userData[0].alamat && userData[0].alamat.length > 0 ? (
            <ul>
              {userData[0].alamat.map((alamat) => (
                <li key={alamat.id_alamat}>{alamat.nama_lokasi}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada alamat yang terdaftar.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* TABEL TABEL TABEL */}

      <h1><br /> <br /> <br />TABEL TABEL TABEL TABEL TABEL TABEL TABEL TABEL TABEL</h1>
      {userData ? (
        <div>
          {/* Display User Data  */}
          <h2>User Information</h2>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(userData[0]).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display Alamat  */}
          <h2> <br /> <br /><br />Addresses</h2>
          {userData[0].alamat.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Location Name</th>
                </tr>
              </thead>
              <tbody>
                {userData[0].alamat.map((alamat) => (
                  <tr key={alamat.id_alamat}>
                    <td>ID: {alamat.id_alamat}</td>
                    <td>LOKASI: {alamat.nama_lokasi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No addresses available.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withAuth(UserPage);
