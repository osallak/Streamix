"use client";

import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NetHeader from "@/components/NetHeader";
import MovieSlider from "@/components/MovieSlider";
import FeaturedMovie from "@/components/FeaturedMovie";
import { Movie } from "@/types/movie";

interface Genre {
  id: number;
  name: string;
}

export default function MoviesPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/movies/genres");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch("/api/movies/now-playing");
        const data = await response.json();
        // Use the first movie from now playing as featured
        if (data.results && data.results.length > 0) {
          setFeaturedMovie(data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching featured movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
    fetchFeaturedMovie();
  }, []);

  if (loading) {
    return null; // TODO: Add loading skeleton
  }

  return (
    <Box sx={{ bgcolor: "#141414", minHeight: "100vh" }}>
      <NetHeader />
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />}
      <Box
        component="main"
        sx={{
          mt: -20,
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <Stack spacing={4} sx={{ pl: { xs: 2, sm: 3, md: 4 } }}>
          <MovieSlider
            title="Now Playing in Cinemas"
            endpoint="/api/movies/now-playing"
          />
          <MovieSlider
            title="Top Rated Movies"
            endpoint="/api/movies/top-rated"
          />
          <MovieSlider title="Popular Movies" endpoint="/api/movies/popular" />
          {genres.map((genre) => (
            <MovieSlider
              key={genre.id}
              title={genre.name}
              endpoint={`/api/movies/discover?with_genres=${genre.id}`}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
