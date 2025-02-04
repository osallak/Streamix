import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-[#E50914] text-2xl md:text-3xl font-bold">
            STREAMIX
          </h1>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                /* Add movies navigation */
              }}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </button>
            <button
              onClick={() => {
                /* Add TV shows navigation */
              }}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
