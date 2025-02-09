"use client";

import { ArrowDropDown } from "@mui/icons-material";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
}

interface SeasonsMenuProps {
  seasons: Season[];
  selectedSeason: number;
  onSeasonChange: (seasonNumber: number) => void;
}

export default function SeasonsMenu({
  seasons,
  selectedSeason,
  onSeasonChange,
}: SeasonsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeasonSelect = (seasonNumber: number) => {
    onSeasonChange(seasonNumber);
    handleClose();
  };

  const currentSeason = seasons.find((s) => s.season_number === selectedSeason);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        endIcon={
          <ArrowDropDown
            sx={{
              width: "2em",
              height: "2em",
              transition: "transform .2s ease",
              transform: open ? "rotate(180deg)" : "none",
            }}
          />
        }
        sx={{
          borderWidth: "4px",
          borderColor: "rgba(255, 255, 255, 0.2)",
          fontFamily: "NBOLD",
          textTransform: "capitalize",
          fontSize: "1rem",
          px: "1.3rem",
          display: "flex",
          alignItems: "center",
          color: "white",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            sx={{
              fontFamily: "NBOLD",
              fontSize: "1rem",
            }}
          >
            {currentSeason?.name || "Select Season"}
          </Typography>
          {currentSeason && (
            <Typography
              sx={{
                fontFamily: "NLight",
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              ({currentSeason.episode_count} Episodes)
            </Typography>
          )}
        </Stack>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#141414",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            minWidth: "200px",
          },
        }}
      >
        {seasons
          .filter((season) => season.season_number > 0)
          .map((season) => (
            <MenuItem
              key={season.id}
              onClick={() => handleSeasonSelect(season.season_number)}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    fontFamily: "NBOLD",
                    fontSize: "1rem",
                  }}
                >
                  {season.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "NLight",
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {season.episode_count} Episodes
                </Typography>
              </Stack>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
