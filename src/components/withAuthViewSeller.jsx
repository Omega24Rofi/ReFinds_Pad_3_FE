"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js's router for client-side navigation
import api from "@/utils/axios";

// Higher Order Component untuk mengecek apakah user sudah login

const withAuthViewSeller = (WrappedComponent) => {
  const WithAuthViewSellerComponent = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
      const token = localStorage.getItem("token");

      // jika belum login, arahkan ke dalam login
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

          setUserData(response.data);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token"); 
          router.push("/login");
        } finally {
          setLoading(false);
        }
      };

      verifyTokenAndFetchUserData();

      
      return () => {
        setLoading(true); // Reset loading state on unmount
        setUserData(null); // Reset user data on unmount
      };
    }, [router]);

    
    if (loading) {
      return <div>Loading...</div>; 
    }

    // Pass userData sebagai parameter dari wrapped component
    return <WrappedComponent {...props} userData={userData} />;
  };


  WithAuthViewSellerComponent.displayName = `WithAuthViewSeller(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthViewSellerComponent;
};

export default withAuthViewSeller;
