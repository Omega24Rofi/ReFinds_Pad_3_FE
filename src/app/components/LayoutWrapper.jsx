"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // List of routes where the layout should be excluded
  const noHeaderRoutes = ['/login', '/register', '/post'];
  const noFooterRoutes = ['/login', '/register'];

  // Conditional check to exclude layout
  if (noHeaderRoutes.includes(pathname) && noFooterRoutes.includes(pathname)) {
    return <>{children}</>;
  } else if (noHeaderRoutes.includes(pathname)) {
    return (
      <>
        {children}
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  );
}
