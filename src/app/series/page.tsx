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

export default function SeriesPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredShow, setFeaturedShow] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/series/genres");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchFeaturedShow = async () => {
      try {
        const response = await fetch("/api/series/on-the-air");
        const data = await response.json();
        // Use the first show from on the air as featured
        if (data.results && data.results.length > 0) {
          const show = {
            ...data.results[0],
            media_type: "tv", // Set media type for TV shows
          };
          setFeaturedShow(show);
        }
      } catch (error) {
        console.error("Error fetching featured show:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
    fetchFeaturedShow();
  }, []);

  if (loading) {
    return null; // TODO: Add loading skeleton
  }

  return (
    <Box sx={{ bgcolor: "#141414", minHeight: "100vh" }}>
      <NetHeader />
      {featuredShow && <FeaturedMovie movie={featuredShow} />}
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
            title="Currently On Air"
            endpoint="/api/series/on-the-air"
            mediaType="tv"
          />
          <MovieSlider
            title="Top Rated Series"
            endpoint="/api/series/top-rated"
            mediaType="tv"
          />
          <MovieSlider
            title="Popular Series"
            endpoint="/api/series/popular"
            mediaType="tv"
          />
          {genres.map((genre) => (
            <MovieSlider
              key={genre.id}
              title={genre.name}
              endpoint={`/api/series/discover?with_genres=${genre.id}`}
              mediaType="tv"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
