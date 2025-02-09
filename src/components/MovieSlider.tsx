"use client";

import { ChevronRight } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";

interface MovieSliderProps {
  title: string;
  endpoint: string;
  mediaType?: "movie" | "tv";
}

export default function MovieSlider({
  title,
  endpoint,
  mediaType = "movie",
}: MovieSliderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const moviesWithType = data.results.map((movie: Movie) => ({
          ...movie,
          media_type: mediaType,
        }));
        setMovies(moviesWithType);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, mediaType]);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ cursor: "pointer" }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "NBOLD",
            fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
            letterSpacing: "-0.5px",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#e50914",
            fontFamily: "NLight",
            fontSize: "1rem",
            transition: "all .2s linear",
            position: "relative",
            opacity: 0,
            right: "20px",
            ...(isHovered && { opacity: 1, right: 0 }),
          }}
        >
          Explore All
        </Typography>
        <ChevronRight
          sx={{
            height: "2rem",
            width: "2rem",
            color: "#e50914",
            transition: "all .2s linear",
            position: "relative",
            opacity: 0,
            right: "100px",
            ...(isHovered && { opacity: 1, right: "8px" }),
          }}
        />
      </Stack>

      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 0.5,
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            pl: { xs: 4, sm: 6, md: 8 },
            pr: { xs: 4, sm: 6, md: 8 },
            py: "60px",
            mt: "-30px",
            mb: "-30px",
          }}
        >
          {movies.map((movie, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto",
                width: {
                  xs: "180px",
                  sm: "220px",
                  md: "260px",
                },
              }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>

        {movies.length > 0 && (
          <>
            <IconButton
              onClick={() => handleScroll("left")}
              sx={{
                position: "absolute",
                left: { xs: 1, sm: 2, md: 3 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                display: { xs: "none", md: "flex" },
                zIndex: 2,
              }}
            >
              <ChevronRight sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
            <IconButton
              onClick={() => handleScroll("right")}
              sx={{
                position: "absolute",
                right: { xs: 1, sm: 2, md: 3 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                display: { xs: "none", md: "flex" },
                zIndex: 2,
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>
    </Stack>
  );
}
