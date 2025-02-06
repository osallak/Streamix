"use client";

import { InfoModalProvider } from "@/context/InfoModalContext";
import { SearchProvider } from "@/context/SearchContext";
import InfoModal from "./InfoModal";
import ClientThemeProvider from "./ClientThemeProvider";
import Navigation from "./Navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientThemeProvider>
      <SearchProvider>
        <InfoModalProvider>
          <Navigation />
          <InfoModal />
          {children}
        </InfoModalProvider>
      </SearchProvider>
    </ClientThemeProvider>
  );
}
