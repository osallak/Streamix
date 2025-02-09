"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeasonsMenu from "./SeasonsMenu";
import { Movie } from "@/types/movie";

interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  air_date: string;
  runtime: number | null;
}

interface SeriesEpisodesProps {
  show: Movie;
}

export default function SeriesEpisodes({ show }: SeriesEpisodesProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `/api/series/${show.id}/season/${selectedSeason}`
        );
        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    if (show.id && selectedSeason) {
      fetchEpisodes();
    }
  }, [show.id, selectedSeason]);

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
  };

  const handleEpisodeClick = (episodeNumber: number) => {
    router.push(`/watch/${show.id}/${selectedSeason}-${episodeNumber}`);
  };

  if (!show.seasons) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "NBOLD",
            fontSize: "2rem",
          }}
        >
          Episodes
        </Typography>
        <SeasonsMenu
          seasons={show.seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={handleSeasonChange}
        />
      </Stack>

      <Stack spacing={2}>
        {episodes.map((episode, index) => (
          <Box key={episode.id}>
            {index > 0 && (
              <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 2 }} />
            )}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", md: "center" }}
              onClick={() => handleEpisodeClick(episode.episode_number)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "NMedium",
                  fontSize: "2rem",
                  minWidth: "3rem",
                  display: { xs: "none", md: "block" },
                }}
              >
                {episode.episode_number < 10 && (
                  <Typography
                    component="span"
                    sx={{
                      color: "white",
                      fontFamily: "NMedium",
                      fontSize: "2rem",
                      opacity: 0,
                    }}
                  >
                    0
                  </Typography>
                )}
                {episode.episode_number}
              </Typography>

              <Box
                sx={{
                  height: "7rem",
                  width: { xs: "100%", md: "200px" },
                  borderRadius: 1,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <img
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                      : show.backdrop_path
                      ? `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
                      : "/no-image.png"
                  }
                  alt={`${episode.name} thumbnail`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ display: { xs: "flex", md: "none" } }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "NMedium",
                        fontSize: "1rem",
                        opacity: 0.7,
                      }}
                    >
                      {episode.episode_number}.
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "NBOLD",
                        fontSize: "1.1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: { xs: "250px", sm: "400px" },
                      }}
                    >
                      {episode.name}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "NBOLD",
                      fontSize: "1.1rem",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    {episode.name}
                  </Typography>
                  {episode.runtime && (
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "NRegular",
                        fontSize: "0.9rem",
                      }}
                    >
                      {episode.runtime}m
                    </Typography>
                  )}
                </Stack>
                {episode.overview ? (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontFamily: "NLight",
                      fontSize: "0.9rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {episode.overview}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontFamily: "NLight",
                      fontSize: "0.9rem",
                    }}
                  >
                    Will be Released on: {episode.air_date}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
