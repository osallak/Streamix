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
  Grid2,
} from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrailer } from "@/hooks/useTrailer";
import { useSimilarMovies } from "@/hooks/useSimilarMovies";
import YoutubePlayer from "./YoutubePlayer";
import MovieCard from "./MovieCard";
import { useInfoModal } from "@/context/InfoModalContext";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "xl",
  height: "100vh",
  bgcolor: "#141414",
  borderRadius: { xs: "0", md: "12px" },
  mt: 4,
  overflow: "hidden",
};

export default function InfoModal() {
  const { infoMovie: movie, setInfoMovie } = useInfoModal();
  const { trailer, getTrailer } = useTrailer();
  const { similarMovies, fetchSimilarMovies } = useSimilarMovies();
  const router = useRouter();

  useEffect(() => {
    if (movie?.id) {
      getTrailer(movie.id, "movie");
      fetchSimilarMovies(movie.id);
    }
  }, [movie, getTrailer, fetchSimilarMovies]);

  const handlePlay = () => {
    if (movie?.id) {
      router.push(`/watch/${movie.id}`);
      setInfoMovie(null);
    }
  };

  if (!movie) return null;

  const releaseYear = movie.release_date?.split("-")[0] || "no Date";
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
          <Box sx={{ width: "100%", height: "80vh", position: "relative" }}>
            <IconButton
              onClick={() => setInfoMovie(null)}
              sx={{ position: "absolute", top: 0, right: 0, zIndex: 99 }}
            >
              <Close sx={{ color: "white" }} />
            </IconButton>

            {/* Movie Trailer/Image Section */}
            <Box sx={{ width: "100%", height: "60%", position: "relative" }}>
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
                    alt={movie.title}
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
                spacing={2}
                sx={{
                  position: "absolute",
                  bottom: "10%",
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
                        fontSize: "clamp(16px, 4vw, 2rem)",
                        whiteSpace: "nowrap",
                        textShadow: "1px 1px 5px black",
                        textTransform: "capitalize",
                      }}
                    >
                      {movie.title}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "#e50914",
                      fontFamily: "NBOLD",
                      textTransform: "capitalize",
                    }}
                    variant="caption"
                    component="span"
                  >
                    Movie
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  onClick={handlePlay}
                  startIcon={
                    <PlayArrowRounded sx={{ width: "2rem", height: "2rem" }} />
                  }
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    alignSelf: "flex-start",
                    px: 4,
                    zIndex: 4,
                    fontFamily: "NBOLD",
                    display: { xs: "none", sm: "flex" },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.75)",
                    },
                  }}
                >
                  Play
                </Button>
              </Stack>
            </Box>

            {/* Movie Details and Similar Movies */}
            <Stack
              sx={{
                px: 2,
                mt: 4,
                width: "100%",
                display: { xs: "none", md: "flex" },
              }}
              spacing={3}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "start", sm: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {isNewMovie && (
                    <Typography
                      sx={{
                        color: "#46d369",
                        fontFamily: "NBOLD",
                        fontSize: "clamp(16px, 4vw, 1rem)",
                      }}
                    >
                      NEW
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "NBOLD",
                      fontSize: "clamp(16px, 4vw, 1rem)",
                    }}
                    variant="caption"
                    component="span"
                  >
                    {releaseYear}
                  </Typography>
                </Stack>

                <Stack sx={{ mr: 1 }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: ".7rem",
                      fontFamily: "NLight",
                    }}
                    variant="caption"
                    component="span"
                  >
                    Votes:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#e50914",
                      fontFamily: "NBOLD",
                      fontSize: "clamp(16px, 4vw, 1rem)",
                    }}
                    variant="caption"
                    component="span"
                  >
                    {Math.round((movie?.vote_average || 0) * 10)}%
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NLight",
                  fontSize: "clamp(16px, 4vw, 1rem)",
                }}
              >
                {movie?.overview}
              </Typography>

              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NBOLD",
                  fontSize: "1.2rem",
                  mt: 2,
                }}
              >
                Similar Movies:
              </Typography>

              <Box sx={{ mt: 2, pb: 4 }}>
                <Grid2
                  container
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {similarMovies?.slice(0, 12).map((similarMovie) => (
                    <Grid2
                      sx={{
                        width: {
                          xs: "45%",
                          sm: "33.33333%",
                          md: "20%",
                        },
                        p: 1,
                      }}
                      key={similarMovie.id}
                    >
                      <MovieCard movie={similarMovie} inModal={true} />
                    </Grid2>
                  ))}
                </Grid2>
              </Box>

              <Toolbar />
            </Stack>

            {/* Mobile content */}
            <Stack
              sx={{
                display: { xs: "flex", md: "none" },
                px: 2,
                position: "relative",
                mt: 2,
                width: "100%",
                pb: 2,
              }}
              spacing={1.5}
            >
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
                        fontSize: "0.9rem",
                      }}
                    >
                      NEW
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "NBOLD",
                      fontSize: "0.9rem",
                    }}
                    variant="caption"
                    component="span"
                  >
                    {releaseYear}
                  </Typography>
                </Stack>

                <Stack sx={{ mr: -4 }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.7rem",
                      fontFamily: "NLight",
                    }}
                    variant="caption"
                    component="span"
                  >
                    Votes:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#e50914",
                      fontFamily: "NBOLD",
                      fontSize: "0.9rem",
                    }}
                    variant="caption"
                    component="span"
                  >
                    {Math.round((movie?.vote_average || 0) * 10)}%
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NLight",
                  fontSize: "0.9rem",
                  maxHeight: "100px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                {movie?.overview}
              </Typography>

              <Button
                variant="contained"
                onClick={handlePlay}
                startIcon={
                  <PlayArrowRounded
                    sx={{ width: "1.5rem", height: "1.5rem" }}
                  />
                }
                sx={{
                  bgcolor: "white",
                  color: "black",
                  alignSelf: "flex-start",
                  px: 3,
                  py: 0.5,
                  fontFamily: "NBOLD",
                  fontSize: "0.9rem",
                  display: { xs: "flex", sm: "none" },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.75)",
                  },
                }}
              >
                Play
              </Button>

              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NBOLD",
                  fontSize: "1rem",
                  mt: 1,
                }}
              >
                Similar Movies:
              </Typography>

              <Box sx={{ mt: 1, pb: 2 }}>
                <Grid2
                  container
                  spacing={1}
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {similarMovies?.slice(0, 6).map((similarMovie) => (
                    <Grid2
                      sx={{
                        width: {
                          xs: "45%",
                          sm: "33.33333%",
                        },
                        p: 0.5,
                      }}
                      key={similarMovie.id}
                    >
                      <MovieCard movie={similarMovie} inModal={true} />
                    </Grid2>
                  ))}
                </Grid2>
              </Box>

              <Toolbar sx={{ minHeight: { xs: "48px" } }} />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Modal>
  );
}
