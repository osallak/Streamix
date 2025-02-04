"use client";

import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { Add, PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    profile_path?: string | null;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    overview?: string;
    known_for_department?: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const title = movie.title || movie.name || "Untitled";
  const releaseYear = (movie.release_date || movie.first_air_date || "").split(
    "-"
  )[0];
  const imageUrl = movie.profile_path
    ? `https://image.tmdb.org/t/p/w500${movie.profile_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";
  const isPerson = !!movie.known_for_department;

  const handlePlay = () => {
    router.push(`/watch/${movie.id}`);
  };

  const handleAddToWatchLater = () => {
    // TODO: Implement watch later functionality
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: "150%", // 2:3 aspect ratio for movie posters
        cursor: "pointer",
        zIndex: 0,
        transition: "all .5s ease",
        ...(isHovered && { transform: "scale(1.08)", zIndex: 99 }),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          src={imageUrl}
          alt={`${title} (${releaseYear})`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            opacity: 0,
            transition: "all .5s ease",
            ...(isHovered && { opacity: 1 }),
          }}
        >
          {isHovered && (
            <Stack
              direction="column"
              width={"100%"}
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                bgcolor: "#141414e0",
                backdropFilter: "blur(2px)",
              }}
            >
              <Box
                sx={{
                  width: "calc(100% - 2px)",
                  height: "40%",
                  position: "absolute",
                  top: 0,
                  bottom: "40%",
                  zIndex: -1,
                }}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box sx={{ width: "100%", height: "40%", position: "relative" }}>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    height: "100%",
                    background: "linear-gradient(transparent 0%, #141414 100%)",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                />
              </Box>

              <Stack
                height={"50%"}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
                spacing={2}
              >
                <Stack spacing={0.5}>
                  <Stack direction={"row"} alignItems="center" spacing={2}>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontFamily: "NBOLD",
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontFamily: "NBOLD",
                        fontSize: "0.8rem",
                      }}
                      variant="caption"
                      component={"span"}
                    >
                      ({releaseYear || "no Date"})
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "secondary.main",
                      fontFamily: "NBOLD",
                      textTransform: "capitalize",
                      fontSize: "0.75rem",
                    }}
                    variant="caption"
                    component={"span"}
                  >
                    {isPerson ? movie.known_for_department || "Actor" : "movie"}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "primary.main",
                    fontFamily: "NLight",
                    fontSize: "0.8rem",
                    lineHeight: 1.2,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    mb: 1,
                  }}
                >
                  {movie.overview?.slice(0, 80) || ""}...
                </Typography>

                {!isPerson && (
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={
                        <PlayArrow
                          sx={{
                            width: "1.5rem",
                            height: "1.5rem",
                            ml: -0.5,
                            mr: -0.5,
                          }}
                        />
                      }
                      sx={{
                        px: 2,
                        py: 0.5,
                        fontFamily: "NBOLD",
                        fontSize: "0.8rem",
                        textTransform: "none",
                        bgcolor: "white",
                        color: "black",
                        minWidth: 0,
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.75)",
                        },
                      }}
                      onClick={handlePlay}
                    >
                      Play
                    </Button>
                    <Stack alignItems="center" spacing={0.5}>
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&:hover + .watch-later-text": {
                              opacity: 1,
                            },
                          }}
                          onClick={handleAddToWatchLater}
                        >
                          <Add
                            sx={{ width: "2rem", height: "2rem", opacity: 0.4 }}
                          />
                        </IconButton>
                        <Typography
                          className="watch-later-text"
                          sx={{
                            color: "primary.main",
                            fontFamily: "NLight",
                            fontSize: "0.7rem",
                            opacity: 0,
                            transition: "opacity 0.2s ease",
                            position: "absolute",
                            bottom: "-20px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Watch Later
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
