"use client";

import { SearchProvider } from "@/context/SearchContext";
import { useSearch } from "@/context/SearchContext";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { useRouter } from "next/navigation";
import { useState } from "react";

function HomeContent() {
  const { query, handleSearchChange } = useSearch();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query === "") {
      setError("Please enter movies, tv shows or people");
    } else {
      router.push(`/browse/${query}`);
      setError("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Background />

      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Main Content */}
        <div className="w-full max-w-[800px] mx-auto text-center">
          <h1 className="text-4xl md:text-[4rem] font-bold text-white mb-4 leading-tight">
            Unlimited movies, TV
            <br />
            shows, and more.
          </h1>

          <p className="text-xl md:text-2xl text-white mb-4">
            Watch anywhere. Cancel anytime.
          </p>

          <p className="text-lg md:text-xl text-white mb-6">
            Ready to watch? Enter your Movie or TV Serie.
          </p>

          {/* Search Section */}
          <div className="flex w-full max-w-[900px] mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="flex-1 h-[60px] px-4 
                       bg-[rgba(0,0,0,0.75)] 
                       border border-[#333333]
                       text-white text-[20px]
                       placeholder-[#8c8c8c]
                       focus:outline-none focus:border-white
                       transition-all"
              style={{
                fontFamily: "Arial, sans-serif",
              }}
            />
            <button
              onClick={handleSearch}
              className="h-[60px] px-8
                       bg-[#E50914] hover:bg-[#f40612]
                       text-white text-[26px] font-normal
                       transition-colors"
              style={{
                fontFamily: "Arial, sans-serif",
              }}
            >
              SEARCH
            </button>
          </div>

          {error && <p className="mt-2 text-[#E87C03]">{error}</p>}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <SearchProvider>
      <HomeContent />
    </SearchProvider>
  );
}
