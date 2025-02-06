"use client";

import { Movie } from "@/types/movie";
import { createContext, useContext, useState } from "react";

interface InfoModalContextType {
  infoMovie: Movie | null;
  setInfoMovie: (movie: Movie | null) => void;
}

const InfoModalContext = createContext<InfoModalContextType | undefined>(
  undefined
);

export function InfoModalProvider({ children }: { children: React.ReactNode }) {
  const [infoMovie, setInfoMovie] = useState<Movie | null>(null);

  return (
    <InfoModalContext.Provider value={{ infoMovie, setInfoMovie }}>
      {children}
    </InfoModalContext.Provider>
  );
}

export function useInfoModal() {
  const context = useContext(InfoModalContext);
  if (context === undefined) {
    throw new Error("useInfoModal must be used within an InfoModalProvider");
  }
  return context;
}
