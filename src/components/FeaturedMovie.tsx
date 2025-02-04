import { Box, Button, Stack, Typography } from "@mui/material";
import { InfoOutlined, PlayArrowRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { useTrailer } from "@/hooks/useTrailer";
import { useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer";

interface FeaturedMovieProps {
  movie: Movie;
}

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  const router = useRouter();
  const { trailer, getTrailer } = useTrailer();

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
    // TODO: Implement movie info modal
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          bgcolor: "black",
        }}
      />
      {trailer ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            position: "relative",
            "& iframe": {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.5)",
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
          bottom: { xs: "20%", md: "25%" },
          left: { xs: "50%", md: "5%" },
          transform: { xs: "translate(-50%, 0)", md: "translate(0, 0)" },
          zIndex: 2,
          maxWidth: { xs: "90%", md: "40%" },
        }}
        spacing={3}
      >
        <Stack spacing={2}>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              lineHeight: 1.2,
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: { xs: "1rem", md: "1.2rem" },
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              display: { xs: "none", md: "block" },
            }}
          >
            {movie.overview}
          </Typography>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Button
            onClick={handlePlay}
            variant="contained"
            startIcon={
              <PlayArrowRounded sx={{ width: "2.5rem", height: "2.5rem" }} />
            }
            sx={{
              px: 4,
              py: 1,
              textTransform: "capitalize",
              fontSize: "1.2rem",
              fontWeight: "bold",
              bgcolor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.75)",
              },
            }}
          >
            Play
          </Button>
          <Button
            onClick={handleMoreInfo}
            startIcon={<InfoOutlined sx={{ width: "2rem", height: "2rem" }} />}
            sx={{
              px: 4,
              py: 1,
              textTransform: "capitalize",
              fontSize: "1.2rem",
              bgcolor: "rgba(109, 109, 110, 0.7)",
              color: "white",
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
