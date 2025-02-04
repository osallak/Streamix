"use client";

import { SearchProvider } from "@/context/SearchContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/app/theme";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  );
}
