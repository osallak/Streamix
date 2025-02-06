"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
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

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(rgba(0, 0, 0, .8),rgba(0, 0, 0, .4), rgba(0, 0, 0, .8)), url(/assets/imgs/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        width="100%"
        alignItems="center"
        spacing={2}
        sx={{
          mt: "64px", // Account for navbar height
          px: 2, // Add some horizontal padding
        }}
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
