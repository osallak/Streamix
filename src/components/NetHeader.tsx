"use client";

import { Search, Cancel, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Menu as MuiMenu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

const pages = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/discover/movies" },
  { label: "TV Shows", path: "/discover/series" },
  { label: "Watch Later", path: "/watchLater" },
];

export default function NetHeader() {
  const { query, handleSearchChange, clearSearchChange } = useSearch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isDiscoverPage = pathname?.includes("/discover");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/browse/${query}`);
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDiscoverPage
            ? "#000000"
            : "linear-gradient(rgba(0, 0, 0, .6), #141414)",
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: { xs: 1, md: 0 },
                paddingRight: 4,
              }}
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
            </Box>

            <Stack
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              spacing={2}
              alignItems="center"
              direction="row"
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(page.path);
                  }}
                  sx={{
                    color: "white",
                    fontFamily: "Inter",
                    textTransform: "capitalize",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Stack>

            <Box sx={{ overflow: "hidden", flexGrow: { xs: 1, sm: 0 } }}>
              <TextField
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleEnterKey}
                placeholder="Search"
                variant="outlined"
                size="small"
                focused
                sx={{
                  "& input": {
                    color: "primary.main",
                    fontFamily: "Inter",
                    fontSize: "0.9rem",
                    height: "1.2rem",
                    padding: "8px 14px",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    border: "1px solid #333333",
                    "&:hover": {
                      border: "1px solid #666666",
                    },
                    "&.Mui-focused": {
                      border: "1px solid white",
                    },
                  },
                  width: { xs: "100%", sm: "200px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleSearch}
                        size="small"
                        sx={{ color: "primary.main", p: 0 }}
                      >
                        <Search sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: query ? (
                    <IconButton
                      onClick={clearSearchChange}
                      size="small"
                      sx={{ color: "primary.main", p: 0 }}
                    >
                      <Cancel sx={{ fontSize: "1.2rem" }} />
                    </IconButton>
                  ) : null,
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <Menu />
              </IconButton>

              <MuiMenu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#141414",
                  },
                }}
              >
                <Box
                  sx={{
                    flexGrow: { xs: 1, md: 0 },
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  <Box onClick={() => router.push("/")} sx={{ px: 5, my: 2 }}>
                    <Typography
                      sx={{
                        color: "secondary.main",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                      }}
                    >
                      STREAMIX
                    </Typography>
                  </Box>
                  <Divider sx={{ bgcolor: "black.light" }} />
                </Box>
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push(page.path);
                    }}
                    sx={{
                      color: "white",
                      fontFamily: "Inter",
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </MuiMenu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {!isDiscoverPage && <Toolbar />}
    </>
  );
}
