"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { InfoModalProvider } from "@/context/InfoModalContext";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    if (html.getAttribute("data-qb-extension-installed") === null) {
      html.setAttribute("data-qb-extension-installed", "true");
      html.setAttribute("data-qb-installed", "true");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <InfoModalProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </InfoModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
