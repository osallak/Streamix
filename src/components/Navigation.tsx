"use client";

import { usePathname } from "next/navigation";
import NetHeader from "./NetHeader";
import Navbar from "./Navbar";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  console.log("Current pathname:", pathname);
  console.log("Is home page?", isHomePage);

  if (isHomePage) {
    console.log("Rendering Navbar for home page");
    return <Navbar hideSearch={true} hideNavIcons={false} />;
  }

  console.log("Rendering NetHeader for other pages");
  return <NetHeader />;
}
