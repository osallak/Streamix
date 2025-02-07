"use client";

import { usePathname } from "next/navigation";
import NetHeader from "./NetHeader";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <NetHeader hideSearch={isHomePage} />;
}
