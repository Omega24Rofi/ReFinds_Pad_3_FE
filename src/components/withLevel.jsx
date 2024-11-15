"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js's router for client-side navigation
import api from "@/utils/axios";

/*
Fungsi ini berguna untuk hanya mengizinkan User yang memiliki level tertentu yang bisa mengakses page X
Jika tidak punya token maka akan redirect ke Login
Jika mempunyai token dan valid, level user diperiksa
Jika user memiliki level yang cocok, halaman akan dirender
Jika user tidak memiliki level yang cocok atau token tidak valid, redirect ke Login dan Token akan dihapus

Param:
  - requiredLevels: Array yang berisi level user yang diperbolehkan. Contoh: ['admin', 'super admin'] 
  - renderIfValid: Boolean yang menentukan apakah halaman akan dirender jika level user sesuai dengan requiredLevels.
*/

const withLevel = (WrappedComponent, requiredLevel, shouldRender) => {
  // console.log("WITH_LEVEL");
  const WithLevelComponent = (props) => {
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

          // console.log('WITH LEVEL RESPONSE', response.data);

          const userLevel = response.data.user.level_account;
          console.log("LEVEL", userLevel);

          // Set user data
          setUserData(response.data);

          // Check user level and shouldRender condition
          if (shouldRender && (userLevel === requiredLevel || requiredLevel.includes(userLevel))) {
            // Allow rendering
          } else {
            // If user level is not sufficient or shouldRender is false, redirect to login
            router.push("/login");
          }
        } catch (error) {
          // If token is invalid or expired, remove it and redirect to login
          localStorage.removeItem("token");
          router.push("/login");
        }
      };

      verifyTokenAndFetchUserData();
    }, [router]);

    // Render the wrapped component if userData is set
    return userData && shouldRender ? <WrappedComponent {...props} userData={userData} /> : null;
  };

  // Add a display name for easier debugging
  WithLevelComponent.displayName = `WithLevel(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithLevelComponent;
};

export default withLevel;


// Contoh Penggunan
// export default withLevel(SubmitProductPage, ['admin', 'super admin'], true);
// export default withLevel(SubmitProductPage, ['admin', 'super admin'], false);
