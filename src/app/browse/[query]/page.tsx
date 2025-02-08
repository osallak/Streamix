"use client";

import { Container, Skeleton, Toolbar, Box, Grid2 } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import MovieCard from "@/components/MovieCard";
import NetHeader from "@/components/NetHeader";
import { Movie } from "@/types/movie";

export default function SearchListScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const query = params.query as string;

  useEffect(() => {
    const searchMovies = async () => {
      if (query && query !== "") {
        setLoading(true);
        try {
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error searching movies:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    searchMovies();
  }, [query]);

  return (
    <Box sx={{ bgcolor: "#141414", minHeight: "100vh" }}>
      <NetHeader />
      <Container maxWidth={false} sx={{ pt: 2, pb: 4 }}>
        <Toolbar />
        {loading ? (
          <SkeletonGrid />
        ) : movies.length > 0 ? (
          <CardsGrid movies={movies} />
        ) : (
          <NoDataFound query={query} />
        )}
      </Container>
    </Box>
  );
}

const SkeletonGrid = () => {
  const skeletonMovies = Array.from(Array(20).keys());

  return (
    <Grid2
      container
      spacing={{ xs: 2, sm: 1 }}
      rowSpacing={{ xs: 6, sm: 4 }}
      sx={{
        px: { xs: 2, sm: 0 },
      }}
    >
      {skeletonMovies.map((_, index) => (
        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="200px"
            animation="wave"
            sx={{
              height: { xs: "200px", sm: "30vw" },
              bgcolor: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

const CardsGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <Grid2
      container
      spacing={{ xs: 2, sm: 1 }}
      rowSpacing={{ xs: 6, sm: 4 }}
      sx={{
        px: { xs: 2, sm: 0 },
      }}
    >
      {movies.map((movie, index) => (
        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={index}>
          <MovieCard movie={movie} />
        </Grid2>
      ))}
    </Grid2>
  );
};
