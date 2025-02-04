"use client";

import {
  Button,
  Container,
  Stack,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Movie, Tv } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import { StyledTextField } from "@/components/StyledTextField";
import { useState } from "react";
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  const router = useRouter();
  const { query, handleSearchChange } = useSearch();
  const [error, setError] = useState("");

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (query === "") {
      setError("Please enter movies, tv shows or people");
      return;
    }
    setError("");
    router.push(`/browse/${query}`);
  };

  const handleMoviesClick = () => {
    router.push("/movies");
  };

  const handleTvClick = () => {
    router.push("/series");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, .8),rgba(0, 0, 0, .4), rgba(0, 0, 0, .8)), url(/assets/imgs/bg.jpg)",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar disableGutters>
        <Stack
          direction="row"
          py={4}
          px={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography
            onClick={() => router.push("/")}
            sx={{
              color: "secondary.main",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            STREAMIX
          </Typography>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }}>
            <IconButton color="secondary" onClick={handleMoviesClick}>
              <Movie
                sx={{
                  width: { xs: "1.5rem", sm: "2rem" },
                  height: { xs: "1.5rem", sm: "2rem" },
                }}
              />
            </IconButton>
            <IconButton color="secondary" onClick={handleTvClick}>
              <Tv
                sx={{
                  width: { xs: "1.5rem", sm: "2rem" },
                  height: { xs: "1.5rem", sm: "2rem" },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>

      <Stack
        direction="column"
        width="100%"
        sx={{ flexGrow: 1 }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{
            textAlign: "center",
            fontFamily: "Inter",
            fontWeight: 500,
            color: "primary.main",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.2,
          }}
        >
          Unlimited movies, TV
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            textAlign: "center",
            fontFamily: "Inter",
            fontWeight: 500,
            color: "primary.main",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.2,
          }}
        >
          shows, and more.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            marginTop: "12px",
            fontFamily: "Inter",
            fontWeight: 400,
            color: "primary.main",
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
          }}
        >
          Watch anywhere. Cancel anytime.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            marginTop: "12px",
            fontFamily: "Inter",
            fontWeight: 400,
            color: "primary.main",
            fontSize: "1.1rem",
          }}
        >
          Ready to watch? Enter your Movie or TV Serie.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          mt="16px"
          spacing={{ xs: 2, md: 0 }}
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems={{ xs: "center", md: "normal" }}
        >
          <StyledTextField
            placeholder="Search"
            variant="standard"
            onChange={handleSearchChange}
            onKeyDown={handleEnterKey}
            value={query}
          />
          <Button
            color="error"
            variant="contained"
            sx={{
              borderRadius: "0px",
              boxShadow: 0,
              fontFamily: "Inter",
              fontWeight: 500,
              px: 8,
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "#b2070e",
              },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>
        {error && (
          <Typography
            variant="caption"
            sx={{
              color: "warning.light",
              mt: 2,
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            {error}
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
