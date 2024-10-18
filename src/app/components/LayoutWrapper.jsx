"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // List of routes where the layout should be excluded
  const noLayoutRoutes = ['/login', '/register'];

  // Conditional check to exclude layout
  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
