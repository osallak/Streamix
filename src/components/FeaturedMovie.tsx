"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { InfoOutlined, PlayArrowRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { useTrailer } from "@/hooks/useTrailer";
import { useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer";
import { useInfoModal } from "@/context/InfoModalContext";

interface FeaturedMovieProps {
  movie: Movie;
}

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  const router = useRouter();
  const { trailer, getTrailer } = useTrailer();
  const { setInfoMovie } = useInfoModal();

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        await getTrailer(movie.id, "movie");
      }
    };
    fetchTrailer();
  }, [movie, getTrailer]);

  const handlePlay = () => {
    router.push(`/watch/${movie.id}`);
  };

  const handleMoreInfo = () => {
    setInfoMovie(movie);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        zIndex: 0,
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          bgcolor: "black",
          display: { xs: "none", md: "block" },
        }}
      />
      {trailer ? (
        <Box
          sx={{
            width: "calc(100%)",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "& iframe": {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              transform: {
                xs: "scale(1.3)",
                md: "scale(1.5)",
              },
            },
          }}
        >
          <YoutubePlayer
            videoId={trailer}
            buttonSize="large"
            autoPlay={true}
            muted={true}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(0deg, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, rgba(20,20,20,0.8) 100%)",
            },
          }}
        >
          {movie?.backdrop_path || movie?.poster_path ? (
            <img
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/original${
                movie?.backdrop_path || movie?.poster_path
              }`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          ) : null}
        </Box>
      )}

      <Stack
        sx={{
          position: "absolute",
          bottom: { xs: "25%", md: "20%" },
          left: { xs: "50%", md: "5%" },
          transform: { xs: "translate(-50%, 0)", md: "translate(0, 0)" },
          zIndex: 2,
          maxWidth: { xs: "90%", md: "80%" },
          width: { xs: "100%", md: "auto" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: { xs: "2rem", md: "2rem" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            textTransform: "capitalize",
            fontSize: { xs: "1.8rem", md: "4rem" },
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            lineHeight: { xs: 1.2, md: 1 },
            textAlign: { xs: "center", md: "left" },
            maxWidth: { md: "100%" },
          }}
        >
          {movie.title}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            color: "white",
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            opacity: 0.9,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          <Typography>{new Date(movie.release_date).getFullYear()}</Typography>
          <Box
            sx={{
              width: "4px",
              height: "4px",
              bgcolor: "white",
              borderRadius: "50%",
            }}
          />
          <Typography>
            {movie.genres
              ?.slice(0, 3)
              .map((genre: any) => genre.name)
              .join(", ")}
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
              <Typography>
                {Math.round(movie.vote_average * 10)}% Match
              </Typography>
            </>
          )}
        </Stack>

        <Stack
          direction={{ xs: "row", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Button
            onClick={handlePlay}
            variant="contained"
            startIcon={
              <PlayArrowRounded
                sx={{
                  width: { xs: "1.5rem", md: "2rem" },
                  height: { xs: "1.5rem", md: "2rem" },
                }}
              />
            }
            sx={{
              px: { xs: 3, md: 4 },
              py: 0,
              textTransform: "capitalize",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: "bold",
              bgcolor: "white",
              color: "black",
              minWidth: "auto",
              height: { xs: "2.5rem", md: "3rem" },
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.75)",
              },
            }}
          >
            Play
          </Button>
          <Button
            onClick={handleMoreInfo}
            startIcon={
              <InfoOutlined
                sx={{
                  width: { xs: "1.5rem", md: "2rem" },
                  height: { xs: "1.5rem", md: "2rem" },
                }}
              />
            }
            sx={{
              px: { xs: 3, md: 4 },
              py: 0,
              textTransform: "capitalize",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: "bold",
              bgcolor: "rgba(109, 109, 110, 0.7)",
              color: "white",
              minWidth: "auto",
              height: { xs: "2.5rem", md: "3rem" },
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              "&:hover": {
                bgcolor: "rgba(109, 109, 110, 0.9)",
              },
            }}
          >
            More Info
          </Button>
        </Stack>
      </Stack>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "70%",

          background:
            "linear-gradient(180deg, transparent 0%, rgba(20,20,20,0.8) 50%, rgba(20,20,20,1) 100%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
