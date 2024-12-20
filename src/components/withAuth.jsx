"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js's router for client-side navigation
import api from "@/utils/axios";


// Berfungi untuk merender page, jika user sudah login

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null); // State to hold user data

    useEffect(() => {
      const token = localStorage.getItem("token");

      // If token doesn't exist, redirect to login page
      if (!token) {
        router.push("/login");
        return;
      }

      // Verify the token and fetch user data
      const verifyTokenAndFetchUserData = async () => {
        try {
          const response = await api.get("/api/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("WITH AUTH DATA:", response.data);
          setUserData(response.data); // Set the user data in state
        } catch (error) {
          // console.error("Token verification failed:", error);
          // If the token is invalid or expired, remove it and redirect to login
          localStorage.removeItem("token");
          // router.push("/login");
        }
      };

      verifyTokenAndFetchUserData();
    }, [router]);

    // Pass userData as a prop to the wrapped component// prob not safe
    return <WrappedComponent userData={userData} />;
  };

  // Add a display name for easier debugging
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
