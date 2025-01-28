import { createContext, useContext, useState } from "react";

interface SearchContextType {
  query: string;
  handleSearchChange: (value: string) => void;
  clearSearchChange: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setQuery(value);
  };

  const clearSearchChange = () => {
    setQuery("");
  };

  return (
    <SearchContext.Provider
      value={{ query, handleSearchChange, clearSearchChange }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
