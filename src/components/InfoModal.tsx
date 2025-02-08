"use client";

import { Close, PlayArrowRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Modal,
  Typography,
  Box,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTrailer } from "@/hooks/useTrailer";
import { useSimilarMovies } from "@/hooks/useSimilarMovies";
import YoutubePlayer from "./YoutubePlayer";
import MovieCard from "./MovieCard";
import { useInfoModal } from "@/context/InfoModalContext";
import Image from "next/image";
import SeriesEpisodes from "./SeriesEpisodes";
import { getTitle } from "@/types/movie";
import { TVShowDetails } from "@/types/tv";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "xl",
  height: { xs: "90vh", md: "100vh" },
  bgcolor: "#141414",
  borderRadius: { xs: "12px", md: "12px" },
  mt: { xs: 0, md: 4 },
  overflow: "hidden",
};

export default function InfoModal() {
  const { infoMovie: movie, setInfoMovie } = useInfoModal();
  const { trailer, getTrailer } = useTrailer();
  const { similarMovies, fetchSimilarMovies } = useSimilarMovies();
  const router = useRouter();
  const [showDetails, setShowDetails] = useState<TVShowDetails | null>(null);

  useEffect(() => {
    if (movie?.id) {
      getTrailer(movie.id, movie.media_type || "movie");
      // Only fetch similar movies for movies, not TV shows
      if (movie.media_type !== "tv") {
        fetchSimilarMovies(movie.id);
      }

      if (movie.media_type === "tv") {
        fetch(`/api/series/${movie.id}`)
          .then((res) => res.json())
          .then((data) => setShowDetails(data))
          .catch(console.error);
      }
    }
  }, [movie, getTrailer, fetchSimilarMovies]);

  const handlePlay = () => {
    if (movie?.id) {
      if (movie.media_type === "tv") {
        router.push(`/watch/${movie.id}/1-1`); // Default to season 1, episode 1
      } else {
        router.push(`/watch/${movie.id}`);
      }
      setInfoMovie(null);
    }
  };

  if (!movie) return null;

  const releaseYear =
    movie.release_date?.split("-")[0] ||
    movie.first_air_date?.split("-")[0] ||
    "no Date";
  const isNewMovie = releaseYear === new Date().getFullYear().toString();

  return (
    <Modal
      open={!!movie}
      onClose={() => setInfoMovie(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container disableGutters maxWidth="lg" sx={style} id="infomodal">
        <Stack
          direction="column"
          width="100%"
          height="100%"
          sx={{
            position: "relative",
            bgcolor: "#141414e0",
            backdropFilter: "blur(2px)",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: {
                xs: "70vh",
                md: movie.media_type === "tv" ? "60vh" : "80vh",
              },
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => setInfoMovie(null)}
              sx={{
                position: "absolute",
                top: { xs: 8, md: 0 },
                right: { xs: 8, md: 0 },
                zIndex: 99,
              }}
            >
              <Close sx={{ color: "white" }} />
            </IconButton>

            {/* Movie/Show Trailer/Image Section */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "45%", md: "60%" },
                position: "relative",
              }}
            >
              {trailer ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <YoutubePlayer
                    videoId={trailer}
                    buttonSize="medium"
                    autoPlay={true}
                    muted={true}
                  />
                </Box>
              ) : (
                <Box
                  sx={{ width: "100%", height: "100%", position: "relative" }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${
                      movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt={getTitle(movie)}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {/* Gradient overlay */}
              <Box
                sx={{
                  height: "100%",
                  background: "linear-gradient(transparent 50%, #141414 100%)",
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                }}
              />

              {/* Title and play button */}
              <Stack
                direction="column"
                spacing={{ xs: 1, md: 2 }}
                sx={{
                  position: "absolute",
                  bottom: { xs: "5%", md: "10%" },
                  left: "5%",
                  zIndex: 4,
                  width: "90%",
                }}
              >
                <Stack sx={{ zIndex: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "white",
                        fontFamily: "NBOLD",
                        fontSize: {
                          xs: "1.2rem",
                          sm: "clamp(16px, 4vw, 2rem)",
                        },
                        whiteSpace: "nowrap",
                        textShadow: "1px 1px 5px black",
                        textTransform: "capitalize",
                      }}
                    >
                      {getTitle(movie)}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "#e50914",
                      fontFamily: "NBOLD",
                      textTransform: "capitalize",
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                    }}
                    variant="caption"
                    component="span"
                  >
                    {movie.media_type === "tv" ? "TV Show" : "Movie"}
                  </Typography>
                </Stack>

                <Button
                  onClick={handlePlay}
                  variant="contained"
                  startIcon={
                    <PlayArrowRounded sx={{ width: "2rem", height: "2rem" }} />
                  }
                  sx={{
                    alignSelf: "flex-start",
                    px: 4,
                    fontFamily: "NBOLD",
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                    bgcolor: "white",
                    color: "black",
                    minWidth: "auto",
                    height: "2.5rem",
                    lineHeight: 1,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    zIndex: 4,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.75)",
                    },
                  }}
                >
                  Play
                </Button>
              </Stack>
            </Box>

            {/* Movie/Show Details and Similar Content */}
            <Stack
              sx={{
                px: { xs: 1.5, md: 2 },
                mt: { xs: 2, md: 4 },
                width: "100%",
              }}
              spacing={{ xs: 2, md: 3 }}
            >
              {/* Mobile Play Button */}
              <Button
                onClick={handlePlay}
                variant="contained"
                startIcon={
                  <PlayArrowRounded sx={{ width: "2rem", height: "2rem" }} />
                }
                sx={{
                  alignSelf: "flex-start",
                  px: 4,
                  fontFamily: "NBOLD",
                  textTransform: "capitalize",
                  fontSize: "1.2rem",
                  bgcolor: "white",
                  color: "black",
                  minWidth: "auto",
                  height: "2.5rem",
                  lineHeight: 1,
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                  zIndex: 4,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.75)",
                  },
                }}
              >
                Play
              </Button>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "start", sm: "center" }}
                spacing={1}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {isNewMovie && (
                    <Typography
                      sx={{
                        color: "#46d369",
                        fontFamily: "NBOLD",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      New
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "NLight",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    {releaseYear}
                  </Typography>
                  {movie.vote_average > 0 && (
                    <>
                      <Box
                        sx={{
                          width: "4px",
                          height: "4px",
                          bgcolor: "white",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#46d369",
                          fontFamily: "NBOLD",
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {Math.round(movie.vote_average * 10)}% Match
                      </Typography>
                    </>
                  )}
                </Stack>
              </Stack>

              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NLight",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  opacity: 0.7,
                }}
              >
                {movie.overview}
              </Typography>

              {/* TV Show Episodes */}
              {movie.media_type === "tv" && showDetails && (
                <SeriesEpisodes
                  show={{
                    ...movie,
                    ...showDetails,
                    backdrop_path: showDetails.backdrop_path || undefined,
                    poster_path: showDetails.poster_path || undefined,
                    vote_count: movie.vote_count,
                    popularity: movie.popularity,
                    adult: movie.adult,
                    genre_ids: movie.genre_ids,
                    original_language: movie.original_language,
                  }}
                />
              )}

              {/* Similar Content - Only for movies */}
              {movie.media_type !== "tv" && similarMovies.length > 0 && (
                <>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "NBOLD",
                      fontSize: "1.5rem",
                      mt: 4,
                    }}
                  >
                    More Like This
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        md: "repeat(4, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {similarMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} inModal />
                    ))}
                  </Box>
                </>
              )}
              <Toolbar />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Modal>
  );
}
