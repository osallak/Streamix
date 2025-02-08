"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { PlayArrow, Info } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTrailer } from "@/hooks/useTrailer";
import YoutubePlayer from "./YoutubePlayer";
import { Movie } from "@/types/movie";
import { useInfoModal } from "@/context/InfoModalContext";

interface MovieCardProps {
  movie: Movie;
  inModal?: boolean;
}

export default function MovieCard({ movie, inModal = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trailer, getTrailer } = useTrailer();
  const router = useRouter();
  const { setInfoMovie } = useInfoModal();

  useEffect(() => {
    if (isHovered && movie?.id) {
      getTrailer(movie.id, "movie");
    }
  }, [isHovered, movie, getTrailer]);

  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : imageUrl;

  const title = movie?.title || "Unknown Title";
  const releaseYear = movie.release_date?.split("-")[0] || "";

  const handlePlayClick = () => {
    router.push(`/watch/${movie.id}`);
  };

  const handleMoreInfo = () => {
    setInfoMovie(movie);
  };

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      lg={2.4}
      sx={{ display: "flex", cursor: "pointer" }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0,
            transition: "all .5s ease",
            ...(isHovered &&
              !inModal && { transform: "scale(1.08)", zIndex: 99 }),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              aspectRatio: "2/3",
            }}
          />

          {/* Mobile Title */}
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              height: "2.5rem",
              mt: 1,
              mb: 1,
              px: 0.5,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontFamily: "NBOLD",
                fontSize: "0.9rem",
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              opacity: 0,
              transition: "all .5s ease",
              ...(isHovered && { opacity: 1 }),
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "block",
            }}
            onClick={() => setIsHovered(!isHovered)}
          >
            {isHovered && (
              <Stack
                direction="column"
                width="100%"
                height="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  bgcolor: "#141414e0",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { xs: "flex-end", sm: "flex-start" },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    position: "relative",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {trailer ? (
                    <YoutubePlayer
                      videoId={trailer}
                      buttonSize="small"
                      autoPlay={true}
                      muted={true}
                    />
                  ) : (
                    <img
                      src={backdropUrl}
                      alt={title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      height: "100%",
                      background:
                        "linear-gradient(transparent 50%, #141414 100%)",
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                    }}
                  />
                </Box>

                <Stack
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: { xs: 2, sm: 1 },
                    height: { xs: "auto", sm: "60%" },
                  }}
                >
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ maxWidth: "100%" }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: "NBOLD",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "80%",
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: "NRegular",
                          fontSize: "0.8rem",
                          flexShrink: 0,
                        }}
                      >
                        ({releaseYear})
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        color: "#e50914",
                        textTransform: "capitalize",
                        fontFamily: "NBOLD",
                        fontSize: "0.8rem",
                      }}
                    >
                      movie
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      flexGrow: 0,
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handlePlayClick}
                      startIcon={<PlayArrow />}
                      sx={{
                        bgcolor: "white",
                        color: "black",
                        textTransform: "none",
                        fontFamily: "NBOLD",
                        px: 4,
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.75)",
                        },
                      }}
                    >
                      Play
                    </Button>
                    {!inModal && (
                      <IconButton
                        size="small"
                        onClick={handleMoreInfo}
                        sx={{
                          color: "white",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <Info sx={{ fontSize: "2rem", opacity: 0.4 }} />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
