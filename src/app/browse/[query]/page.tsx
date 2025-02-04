"use client";

import { Container, Grid, Skeleton, Toolbar, Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import MovieCard from "@/components/MovieCard";
import NetHeader from "@/components/NetHeader";

export default function SearchListScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const query = params.query as string;

  useEffect(() => {
    const searchMovies = async () => {
      if (query && query !== "") {
        setLoading(true);
        try {
          // TODO: Implement API call
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
      <Container maxWidth="100%" sx={{ pt: 2, pb: 4 }}>
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
    <Grid container spacing={2} sx={{ px: 2 }}>
      {skeletonMovies.map((_, index) => (
        <Grid item xs={12} sm={4} md={3} lg={2.4} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="30vw"
            animation="wave"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const CardsGrid = ({ movies }: { movies: any[] }) => {
  return (
    <Grid container spacing={2} sx={{ px: 2 }}>
      {movies.map((movie, index) => (
        <Grid item xs={12} sm={4} md={3} lg={2.4} key={index}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};
